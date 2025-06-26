const createHttpError = require("http-errors");
const { model } = require("../../config/sequelize.config");
const { User, Otp } = require("../user/model/user.model")

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
        console.log("'mobile'++++++>>>>" ,mobile);
        console.log("'code'++++++>>>>" ,code);
        const user = await User.findOne({
            where: { mobile },
            include: [
                { model: Otp, as: "otp" }
            ]
        })

        if (!user) throw createHttpError(401, 'not found  user account')
        if(user?.otp?.code!==code) throw createHttpError(401 ,"otp code is invalid")    
        if(user?.otp?.expires_in > new Date()) throw createHttpError(401 ," otp code  is expired")    
             return res.json({
            message:" logged in successfully "})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    sendOtp,
    checkOtp,
}