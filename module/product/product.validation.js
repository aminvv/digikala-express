const { validate, Joi } = require('express-validation')
const { ProductType } = require('../../common/constant/product.constant')
const createProductValidation = validate({
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().valid(...Object.values(ProductType)).required(),
        price: Joi.number().optional().allow(null),
        discount: Joi.number().optional().allow(null),
        count: Joi.number().optional().allow(null),
        active_discount: Joi.boolean().optional().allow(null),

        details: Joi.array().items(
            Joi.object({
                key: Joi.string().required(),
                value: Joi.string().required(),
            })
        ).optional(),

        colors: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                code: Joi.string().required(),
                price: Joi.number().optional().allow(null),
                discount: Joi.number().optional().allow(null),
                active_discount: Joi.boolean().optional().allow(null),
                count: Joi.number().optional().allow(null),
            })
        ).optional(),

        sizes: Joi.array().items(
            Joi.object({
                size: Joi.string().required(),
                price: Joi.number().optional().allow(null),
                discount: Joi.number().optional().allow(null),
                active_discount: Joi.boolean().optional().allow(null),
                count: Joi.number().required(),
            })
        ).optional()



    })
})



module.exports={
    createProductValidation
}