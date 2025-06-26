 const{Router}=require('express')
 const{sendOtp, checkOtp}=require('./auth.service')


const router=Router()

router.post('/send-otp',sendOtp)
router.post('/check-otp',checkOtp)


module.exports={
    authRoute:router
}
