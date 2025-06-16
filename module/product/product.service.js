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
                detailList.push({
                    key: item.key,
                    value: item.value,
                    productId: product.id,
                })
            }
            if (detailList.length > 0) {
                await ProductDetail.bulkCreate(detailList)
            }
        }

        
        if (type == ProductType.Coloring) {
            let colorList = []
            console.log(colorList);
            if (colors && Array.isArray(colors)) {
                for (const item of colors) {
                    colorList.push({
                        color_name: item.name,
                        color_code: item.code,
                        productId: product.id,
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
                        productId: product.id,
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

        return res.json({
            message:"create product successfully"
        })

    } catch (error) {
        next(error)
    }
}


async  function getProduct(req,res,next){
    try {
        const products=await Product.findAll({})
        return res.json({
            products
        })
    } catch (error) {
        next(error)
    }
}


async  function getProductById(req,res,next){
    try {
        const{id}=req.params
        const product=await Product.findOne({
            where:{id},
            include:[
                {model:ProductDetail,as:"details"},
                {model:ProductColor,as:"colors"},
                {model:ProductSize,as:"sizes"},
            ]
        })
        if(!product)throw createHttpError(404,"not found product")
        return res.json({
            product
        })
    } catch (error) {
        next(error)
    }
}

module.exports={
    createProduct,
    getProduct,
    getProductById,
}  