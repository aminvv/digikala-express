const express = require('express')
const { config } = require('dotenv')
const sequelize = require('./config/sequelize.config')
const { ErrorHandel, ErrorNotFound } = require('./common/errorHandel/errorHandling')
const initDataBase = require('./config/model.initial')
const {ProductRoute} = require('./module/product/product.routes')
const {BasketRoute} = require('./module/basket/basket.routes')
const {authRoute} = require('./module/auth/auth.routes')
const { PaymentRoute } = require('./module/payment/payment.routes')
const { OrderRoute } = require('./module/order/order.routes')





require('./module/product/model/product.model')
config()
async function main() {
    await initDataBase()
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/auth',authRoute)
    app.use('/product',ProductRoute)
    app.use('/basket',BasketRoute)
    app.use('/payment',PaymentRoute)
    app.use('/Order',OrderRoute)








    ErrorHandel(app)
    ErrorNotFound(app)
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`server  is run port 3000 :: http://localhost:${PORT}`);
    })
}

main()      