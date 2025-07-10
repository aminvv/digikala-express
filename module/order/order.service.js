
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




module.exports = {
    getMyOrders,
    getOneOrderById
}