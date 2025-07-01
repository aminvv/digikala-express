const{Router}=require('express')
const { AuthGuard } = require('../auth/guard/auth.guard')
const { addToBasket, getUserBasket } = require('../basket/service/basket.service')

const router=Router()

router.post('/add',AuthGuard,addToBasket)
router.get('/get-Basket',AuthGuard,getUserBasket)

module.exports={
    BasketRoute:router
}
