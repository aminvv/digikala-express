const{Router}=require('express')
const { paymentBasket } = require('./payment.service')
const { AuthGuard } = require('../auth/guard/auth.guard')

const router=Router()

router.post('/',AuthGuard,paymentBasket)

module.exports={
    PaymentRoute:router
}
