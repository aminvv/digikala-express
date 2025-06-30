const{Router}=require('express')
const { AuthGuard } = require('../auth/guard/auth.guard')
const { addToBasket } = require('../basket/service/basket.service')

const router=Router()

router.post('/add',AuthGuard,addToBasket)

module.exports={
    BasketRoute:router
}
