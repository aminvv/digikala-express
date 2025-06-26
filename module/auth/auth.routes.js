 const{Router}=require('express')
 const{sendOtp}=require('./auth.service')


const router=Router()

router.post('/send-otp',sendOtp)


module.exports={
    authRoute:router
}
