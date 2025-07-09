const { getUserBasketById } = require("../basket/service/basket.service");
const { Payment } = require("../payment/model/payment.model");
const { Order, OrderItems } = require("../order/model/order.model");
const { OrderStatus } = require("../../common/constant/order.constant");
const { zarinpalRequest, zarinpalVerify } = require("../zarinpal/zarinpal.service");
const createHttpError = require("http-errors");
const { Basket } = require("../basket/model/basket.model");

async function paymentBasket(req, res, next) {
    try {
        const { id: userId } = req.user
        const { basket, totalAmount, totalDiscount, finalAmount, } = await getUserBasketById(userId)
        const payment = await Payment.create({
            userId,
            amount: finalAmount,
            status: false,
        })

        const order = await Order.create({
            paymentId: payment.id,
            userId: userId,
            total_amount: totalAmount,
            final_amount: finalAmount,
            discount_amount: totalDiscount,
            status: OrderStatus.Pending,
            address: "azarbyjangarbi - urmia - alamemajleci - 123",
        })
        payment.orderId = order.id
        
        let orderList = []
        for (const item of basket) {
            let items = []
            if (item.sizes && item.sizes.length > 0) {
                items = item?.sizes.map((size) => {
                    return {
                        orderId: order.id,
                        productId: item?.id,
                        sizeId: size?.id,
                        count: size?.count,
                    }
                })
            } else if (item.colors && item.colors.length > 0) {
                items = item?.colors.map((color) => {
                    return {
                        orderId: order.id,
                        productId: item?.id,
                        colorId: color?.id,
                        count: color?.count,
                    }
                })
            } else {
                items = [{
                    orderId: order.id,
                    productId: item?.id,
                    count: item?.count
                }]
            }
            orderList.push(...items)
        }

        
        await OrderItems.bulkCreate(orderList)
        const amount = Math.ceil(payment?.amount);
        const result = await zarinpalRequest(amount, req.user)
        payment.Authority=result?.Authority
        await payment.save()
        return res.json({
            result
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}


async function paymentVerify(req, res, next) {
    try {
        const { Authority, Status } = req.query
        if (Status === "OK" && Authority) {
            const payment = await payment.findOne({ where: { Authority } })
            if (!payment) {
                throw createHttpError(404, 'payment not found')
            }
            const result = await zarinpalVerify(payment?.amount, Authority)
            if (result) {
                payment.status = true
                payment.refId = result?.ref_id
                const order = await Order.findByPk(payment?.orderId)
                order.status = OrderStatus.InProcess
                await order.save()
                await payment.save()
                await Basket.destroy({where:{id:payment?.userId}})
                if (!order) {
                    throw createHttpError(404, 'order not found')
                }
                res.redirect("https://frontenddomain.compayment?status=success")
            }else{
                await Order.destroy({where:{id:payment?.orderId}})
                await Payment.destroy({where:{id:payment?.if}})
            }
        }

        res.redirect("https://frontenddomain.compayment?status=failure")
    } catch (error) {
        res.redirect("https://frontenddomain.compayment?status=failure")
    }
}


module.exports = {
    paymentBasket,
    paymentVerify
}