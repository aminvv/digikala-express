 const{Router}=require('express')
 const{sendOtp, checkOtp, verifiedRefreshToken}=require('./auth.service')


const router=Router()

router.post('/send-otp',sendOtp)
router.post('/check-otp',checkOtp)
router.post('/refresh-token',verifiedRefreshToken)


module.exports={
    authRoute:router
}
