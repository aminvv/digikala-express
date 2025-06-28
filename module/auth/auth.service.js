const createHttpError = require("http-errors");
const { User, Otp } = require("../user/model/user.model");
const { RefreshTokenModel } = require("../user/model/refresh_token.model");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
config()
async function sendOtp(req, res, next) {
    try {
        const { mobile } = req.body;

        const code = (Math.floor(10000 + Math.random() * 90000)).toString()
        const expires_in = 2 * 60;

        let user = await User.findOne({ where: { mobile } });
        let otp;

        if (!user) {
            user = await User.create({ mobile });

            otp = await Otp.create({
                code,
                expires_in,
                userId: user.id
            });

        } else {
            otp = await Otp.findOne({ where: { userId: user.id } });

            if (otp) {
                otp.code = code;
                otp.expires_in = expires_in;
                await otp.save();
            } else {
                otp = await Otp.create({
                    code,
                    expires_in,
                    userId: user.id
                });
            }
        }

        return res.json({
            message: "send otp code successfully",
            code
        });



    } catch (error) {
        console.log(error);
        next(error)
    }
}


async function checkOtp(req, res, next) {
    try {

        const { mobile, code } = req.body
        const user = await User.findOne({
            where: { mobile },
            include: [
                { model: Otp, as: "otp" }
            ]
        })

        if (!user) throw createHttpError(401, 'not found  user account')
        if (user?.otp?.code !== code) throw createHttpError(401, "otp code is invalid")
        if (user?.otp?.expires_in > new Date()) throw createHttpError(401, " otp code  is expired")
        const token = generateToken({ userId: user.id })
        return res.json({
            message: " logged in successfully ",
            token,
        })
    } catch (error) {
        next(error)
    }
}


async function verifiedRefreshToken(req, res, next) {
    try {
        const { refreshToken:token } = req.body
        if (!token) throw createHttpError(401, " login on your account ")

            
        const verified = jwt.verify(token, process.env.REFRESH_TOKEN)
        if (!verified) throw createHttpError(401, " login on your account ")


        if (verified?.userId) {
            const user = await User.findByPk(verified?.userId)
            if (!user) throw createHttpError(401, " login on your account ")
            const existToken = await RefreshTokenModel.findOne({
                where: { token }
            })
            if (existToken) throw createHttpError(401, "token expires")
            await RefreshTokenModel.create({
                token,
                userId: user.id
            })
            const { AccessToken, RefreshToken } = await generateToken({ userId: user.id })
            return res.json({
                AccessToken,
                RefreshToken
            })
        }
    } catch (error) {
        next(error)
    }
}


async function generateToken(payload) {
    const AccessToken = jwt.sign(payload,
        process.env.ACCESS_TOKEN, {
        expiresIn: "1d"
    })


    const RefreshToken = jwt.sign(payload,
        process.env.REFRESH_TOKEN, {
        expiresIn: "7d"
    })
    return {
        AccessToken,
        RefreshToken
    }
}



module.exports = {
    sendOtp,
    checkOtp,
    verifiedRefreshToken,
}