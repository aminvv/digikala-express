const { getUserBasketById } = require("../basket/service/basket.service");
const { Payment } = require("../payment/model/payment.model");
const { Order, OrderItems } = require("../order/model/order.model");
const { OrderStatus } = require("../../common/constant/order.constant");

async function paymentBasket(req, res, next) {
    try {
        const { id: userId } = req.user
        const { basket, totalAmount, totalDiscount, finalAmount, } = await getUserBasketById(userId)
        const payment = await Payment.create({
            userId,
            amount:finalAmount,
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
        await payment.save()

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
                items=[{
                    orderId:order.id,
                    productId:item?.id,
                    count:item?.count
                }]
            }
            orderList.push(...items)
        }


        await OrderItems.bulkCreate(orderList)

        return res.json({
            paymentUrl:"https://zarinpal.com/payment"
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}



module.exports = {
    paymentBasket
}