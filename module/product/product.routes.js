const{Router}=require('express')
const { createProductValidation } = require('./product.validation')
const { createProduct, getProduct, getProductById } = require('./product.service')

const router=Router()

router.post('/create-product',createProductValidation,createProduct)
router.get('/get-products',getProduct)
router.get('/getById-product/:id',getProductById)

module.exports={
    ProductRoute:router
}
