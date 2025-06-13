const express = require('express')
const { config } = require('dotenv')
const { ErrorHandel, ErrorNotFound } = require('./common/errorHandel/errorHandling')
const { sequelize } = require('./config/sequelize.config')
const app = express()





config()
async function main() {
    sequelize
    app.use(express.json)
    app.use(express.urlencoded)

 






    ErrorHandel(app)
    ErrorNotFound(app)
}
const PORT = process.env.PORT
app.listen(PORT , () => {
    console.log(`server  is run port 3000 :: http://localhost:${PORT}`);
}) 

main()     