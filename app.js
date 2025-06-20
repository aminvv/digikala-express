const express = require('express')
const { config } = require('dotenv')
const sequelize = require('./config/sequelize.config')
const { ErrorHandel, ErrorNotFound } = require('./common/errorHandel/errorHandling')
const initDataBase = require('./config/model.initial')
const {ProductRoute} = require('./module/product/product.routes')





require('./module/product/model/product.model')
config()
async function main() {
    await initDataBase()
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/product',ProductRoute)








    ErrorHandel(app)
    ErrorNotFound(app)
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`server  is run port 3000 :: http://localhost:${PORT}`);
    })
}

main()      