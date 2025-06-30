
const createHttpError = require("http-errors")
const { Product, ProductColor, ProductSize } = require("../../product/model/product.model")
const { Basket } = require("../../basket/model/basket.model")
const { ProductType } = require("../../../common/constant/product.constant")

async function addToBasket(req, res, next) {
    try {
        const {id: userId = undefined} = req?.user ?? {};
        const {productId, sizeId, colorId} = req.body;
        const product = await Product.findByPk(productId);
        if (!product) throw createHttpError(404, "not found product");
        const basketItem = {
            productId: product.id,
            userId
        };
        let productCount = undefined;
        let colorCount = undefined;
        let sizeCount = undefined;
        if (product.type === ProductType.Coloring) {
             console.log("✅ Product is coloring");
            if (!colorId) throw createHttpError(400, "send product color detail");
            const productColor = await ProductColor.findByPk(colorId);
            if (!productColor) throw createHttpError(404, "not found color");
            basketItem['colorId'] = colorId;
            colorCount = productColor?.count ?? 0;
            if (colorCount === 0) throw createHttpError(400, "product count not enough");

        } else if (product.type === ProductType.Sizing) {
             console.log("✅ Product is sizing");
            if (!sizeId) throw createHttpError(400, "send product color count detail");
            const productSize = await ProductSize.findByPk(sizeId);
            if (!productSize) throw createHttpError(404, "not found size");
            basketItem['sizeId'] = sizeId;
            sizeCount = productSize?.count ?? 0;
            if (sizeCount === 0) throw createHttpError(400, "product size count not enough");
        } else {
            productCount = product?.count ?? 0;
            if (productCount === 0) throw createHttpError(400, "product count not enough");
        }
        const basket = await Basket.findOne({where: basketItem});
        if (basket) {
            if (sizeCount && sizeCount > basket?.count) {
                basket.count += 1;
            } else if (colorCount && colorCount > basket?.count) {
                basket.count += 1;
            } else if (productCount && productCount > basket?.count) {
                basket.count += 1;
            } else {
                throw createHttpError(400, "product count not enough");
            }
            await basket.save();
        } else {
            await Basket.create({...basketItem, count: 1});
        }
        console.log("basketItem=====>>>>>>",basketItem);
        return res.json({
            message: "added to basket successfully"
        });
    } catch (error) {
        next(error);
    }
}




module.exports={
    addToBasket
}