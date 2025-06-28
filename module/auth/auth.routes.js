 const{Router}=require('express')
 const{sendOtp, checkOtp, verifiedRefreshToken}=require('./auth.service')
const { AuthGuard } = require('./guard/auth.guard')


const router=Router()

router.post('/send-otp',sendOtp)
router.post('/check-otp',checkOtp)
router.post('/refresh-token',verifiedRefreshToken)
router.get('/check-login',AuthGuard,(req,res,next)=>{
    res.json(req.user ?? {})
})


module.exports={
    authRoute:router
}
