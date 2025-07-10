const{Router}=require("express")
const { AuthGuard } = require("../auth/guard/auth.guard")
const { getMyOrders, getOneOrderById, setPackedStatusToOrder, setInTransitStatusToOrder, setCancelStatusToOrder, setDeliveryStatusToOrder } = require("./order.service")
const { orderStatusReasonValidation } = require("./order.validation")
const router=Router()


router.get('/',AuthGuard,getMyOrders)
router.get('/:id',AuthGuard,getOneOrderById)
router.patch('set-packed/:id',AuthGuard,setPackedStatusToOrder)
router.patch('set-in-transit/:id',AuthGuard,setInTransitStatusToOrder)
router.patch('cancel/:id',AuthGuard,orderStatusReasonValidation,setCancelStatusToOrder)
router.patch('set-delivery/:id',AuthGuard,setDeliveryStatusToOrder)

module.exports={
 OrderRoute:router
}