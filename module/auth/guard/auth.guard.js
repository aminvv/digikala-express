const { config } = require("dotenv")
const createHttpError = require("http-errors")
const jwt = require("jsonwebtoken")
const { User } = require("../../user/model/user.model")

config()
async function AuthGuard(req, res, next) {
    try {

        const authorization = req?.headers?.authorization ?? undefined
        if (!authorization) throw createHttpError(401, "login on your account")

        const [bearer, token] = authorization.split(" ")
        if (!bearer || bearer.toLowerCase() !== "bearer") throw createHttpError(401, "login on your account")

        const verified = jwt.verify(token, process.env.ACCESS_TOKEN)
        if (!verified) throw createHttpError(401, "login on your account")
        if (verified?.userId) {
            const user = await User.findByPk(verified.userId)
            if (!user) throw createHttpError(401, "login on your account")
            req.user = {
                id: user.id,
                mobile: user.mobile,
                fullname: user.fullname,
            }
        }
        return next()


    } catch (error) {
        next(error)
    }
}



module.exports={
    AuthGuard
}