const{Router}=require('express')
const { paymentBasket, paymentVerify } = require('./payment.service')
const { AuthGuard } = require('../auth/guard/auth.guard')

const router=Router()

router.post('/',AuthGuard,paymentBasket)
router.get('/callback',paymentVerify)

module.exports={
    PaymentRoute:router
}
