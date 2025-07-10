const { validate, Joi } = require('express-validation')


const orderStatusReasonValidation = validate({
    body: Joi.object({
        reason: Joi.string().required(),
    })
})




module.exports = {
    orderStatusReasonValidation
}