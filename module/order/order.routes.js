const{Router}=require("express")
const { AuthGuard } = require("../auth/guard/auth.guard")
const { getMyOrders, getOneOrderById } = require("./order.service")
const router=Router()


router.get('/',AuthGuard,getMyOrders)
router.get('/:id',AuthGuard,getOneOrderById)

module.exports={
 OrderRoute:router
}