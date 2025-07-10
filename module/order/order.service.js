
const { Order, OrderItems } = require("./model/order.model")
const { OrderStatus } = require("../../common/constant/order.constant")
const createHttpError = require("http-errors")
const { model } = require("../../config/sequelize.config")
const { Product, ProductSize, ProductColor } = require("../product/model/product.model")

async function getMyOrders(req, res, next) {
    try {
        const { id: userId } = req.user
        const { status } = req.query
        if (!status || !Object.values(OrderStatus).includes(status)) {
            throw createHttpError(400, "send correct status")
        }
        const orders = await Order.findOne({ where: { status, userId } })
        if (!orders) {
            throw createHttpError(404, "order is not exist")
        }
        res.json({ orders })


    } catch (error) {
        next(error)
    }
}




async function getOneOrderById(req, res, next) {
    try {
        const { id: userId } = req.user
        const { id } = req.params

        const orders = await Order.findOne({
            where: { id, userId },
            include: [{
                model: OrderItems, as: 'items' ,include:[
                    {model: Product, as: 'product' },
                    {model: ProductSize, as: 'size' },
                    {model: ProductColor, as: 'color' },
                ]
            }]
        })
        if (!orders) {
            throw createHttpError(404, "order is not exist")
        }
        res.json({ orders })


    } catch (error) {
        next(error)
    }
}


async function setPackedStatusToOrder(req,res,next){
try {
    
    const {id}=req.params
    const order=await Order.findByPk(id)
    if(!order){
        throw createHttpError(404,"order not found")
    }
    if(order.status !== OrderStatus.InProcess){
        throw createHttpError(400,"order  status should  be in-process ")
    }
    order.status=OrderStatus.Packed
    await order.save()
    return res.json({
        message:" set order to packed line"
    })

} catch (error) {
    next(error)
}
}


async function setInTransitStatusToOrder(req,res,next){
try {
    
    const {id}=req.params
    const order=await Order.findByPk(id)
    if(!order){
        throw createHttpError(404,"order not found")
    }
    if(order.status !== OrderStatus.InTransit){
        throw createHttpError(400,"order  status should  be in-process ")
    }
    order.status=OrderStatus.InTransit
    await order.save()
    return res.json({
        message:" set order to in-transit line"
    })

} catch (error) {
    next(error)
}
}


async function setCancelStatusToOrder(req,res,next){
try {
    
    const {id}=req.params
    const {reason}=req.body
    const order=await Order.findByPk(id)
    if(!order){
        throw createHttpError(404,"order not found")
    }
    if( [OrderStatus.InProcess,OrderStatus.Delivery,OrderStatus.Canceled].includes(order.status)){
        throw createHttpError(400,"select correct order to cancel ")
    }
    order.status=OrderStatus.Canceled
    order.reason=reason
    await order.save()
    return res.json({
        message:" cancelled order successfully"
    })

} catch (error) {
    next(error)
}
}


async function setDeliveryStatusToOrder(req,res,next){
try {
    
    const {id}=req.params
    const order=await Order.findByPk(id)
    if(!order){
        throw createHttpError(404,"order not found")
    }
    if(order.status !== OrderStatus.InTransit){
        throw createHttpError(400,"order  status should  be in-transit ")
    }
    order.status=OrderStatus.Delivery
    await order.save()
    return res.json({
        message:"  order delivery to customer successfully"
    })

} catch (error) {
    next(error)
}
}



module.exports = {
    getMyOrders,
    getOneOrderById,
    setPackedStatusToOrder,
    setInTransitStatusToOrder,
    setCancelStatusToOrder,
    setDeliveryStatusToOrder,
}