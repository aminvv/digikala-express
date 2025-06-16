const createHttpError = require('http-errors')
const { ProductType } = require('../../common/constant/product.constant')
const { Product, ProductDetail, ProductColor, ProductSize } = require('./model/product.model')
async function createProduct(req, res, next) {
    try {

        const { 
            title,
            description,
            type,
            price = undefined,
            discount = undefined,
            active_discount = undefined,
            count = undefined,
            colors,
            sizes,
            details,
        } = req.body
        if (!Object.values(ProductType).includes(type)) {
            throw createHttpError(400, 'invalid product type')
        }

        const product = await Product.create({
            title,
            description,
            type,
            price,
            discount,
            active_discount,
            count,
            colors,
            sizes,
            details,
        })

        if (details && Array.isArray(details)) {
            let detailList = []
            for (const item of details) {
                details.push({
                    key: item.key,
                    value: item.value,
                    productId: item.productId,
                })
            }
            if (detailList.length > 0) {
                await ProductDetail.bulkCreate(detailList)
            }
        }

        if (type == ProductType.Coloring) {
            let colorList = []
            if (colors && Array.isArray(colors)) {
                for (const item of colors) {
                    colorList.push({
                        color_name: item.name,
                        color_code: item.code,
                        productId: item.productId,
                        count: item.count,
                        price: item.price,
                        discount: item.discount,
                        active_discount: item.active_discount,
                    })
                }

                if (colorList.length > 0) {
                    await ProductColor.bulkCreate(colorList)
                }
            }
        }


        if (type == ProductType.Sizing) {
            let sizesList = []
            if (sizes && Array.isArray(sizes)) {
                for (const item of sizes) {
                    sizesList.push({
                        size: item.size,
                        productId: item.productId,
                        count: item.count,
                        price: item.price,
                        discount: item.discount,
                        active_discount: item.active_discount,
                    })
                }
                if (sizesList.length > 0) {
                    await ProductSize.bulkCreate(sizesList)
                }
            }
        }



    } catch (error) {
        next(error)
    }
}


module.exports={
    createProduct
}