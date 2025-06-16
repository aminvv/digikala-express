const{Router}=require('express')
const { createProductValidation } = require('./product.validation')
const { createProduct, getProduct, getProductById, removeProduct } = require('./product.service')

const router=Router()

router.post('/create-product',createProductValidation,createProduct)
router.get('/get-products',getProduct)
router.get('/getById-product/:id',getProductById)
router.delete('/remove-product/:id',removeProduct)

module.exports={
    ProductRoute:router
}
