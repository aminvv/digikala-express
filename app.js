const express = require('express')
const { config } = require('dotenv')
const sequelize = require('./config/sequelize.config')
const { ErrorHandel, ErrorNotFound } = require('./common/errorHandel/errorHandling')
const initDataBase = require('./config/model.initial')





require('./module/product/model/product.model')
config()
async function main() {
    await initDataBase()
    await sequelize.sync({force:true})
    const app = express()
    app.use(express.json)
    app.use(express.urlencoded)








    ErrorHandel(app)
    ErrorNotFound(app)
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`server  is run port 3000 :: http://localhost:${PORT}`);
    })
}

main()      