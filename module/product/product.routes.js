const{Router}=require('express')
const { createProductValidation } = require('./product.validation')
const { createProduct } = require('./product.service')

const router=Router()

router.post('/create-product',createProductValidation,createProduct)


