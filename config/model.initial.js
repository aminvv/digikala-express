const { Basket } = require("../module/basket/model/basket.model");
const { Order, OrderItems } = require("../module/order/model/order.model");
const { Discount } = require("../module/discount/model/discount.model");
const { Product, ProductDetail, ProductColor, ProductSize } = require("../module/product/model/product.model");
const { Otp, User } = require("../module/user/model/user.model");
const sequelize = require("./sequelize.config");
const { Payment } = require("../module/payment/model/payment.model");

async function initDataBase() {
    Product.hasMany(ProductDetail, { foreignKey: "productId", sourceKey: "id", as: "details" });
    ProductDetail.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });

    Product.hasMany(ProductColor, { foreignKey: "productId", sourceKey: "id", as: "colors" });
    ProductColor.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });

    Product.hasMany(ProductSize, { foreignKey: "productId", sourceKey: "id", as: "sizes" });
    ProductSize.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });


    User.hasOne(Otp, { foreignKey: "userId", sourceKey: "id", as: "otp" })
    Otp.belongsTo(User, { foreignKey: "userId", targetKey: "id" })


    Product.hasMany(Basket, { foreignKey: "productId", sourceKey: "id", as: "basket" })
    ProductColor.hasMany(Basket, { foreignKey: "colorId", sourceKey: "id", as: "basket" })
    ProductSize.hasMany(Basket, { foreignKey: "sizeId", sourceKey: "id", as: "basket" })
    User.hasMany(Basket, { foreignKey: "userId", sourceKey: "id", as: "basket" })
    Discount.hasMany(Basket, { foreignKey: "discountId", sourceKey: "id", as: "basket" })


    Basket.belongsTo(Product, { foreignKey: "productId", targetKey: "id", as: "product" })
    Basket.belongsTo(User, { foreignKey: "userId", targetKey: "id", as: "user" })
    Basket.belongsTo(ProductColor, { foreignKey: "colorId", targetKey: "id", as: "color" })
    Basket.belongsTo(ProductSize, { foreignKey: "sizeId", targetKey: "id", as: "size" })
    Basket.belongsTo(Discount, { foreignKey: "discountId", targetKey: "id", as: "discount" })
    await sequelize.sync({ alter: true })


    Order.hasMany(OrderItems, { foreignKey: "orderId", sourceKey: "id", as: "items" });
    User.hasMany(Order, { foreignKey: "userId", sourceKey: "id", as: "orders" });
    OrderItems.belongsTo(Order, { foreignKey: "orderId", targetKey: "id" });

    

    User.hasMany(Payment, { foreignKey: "userId", sourceKey: "id", as: "payments" })
    Order.hasOne(Payment, { foreignKey: { name: "orderId", onDelete: "CASCADE" }, sourceKey: "id", as: "payment" });
    Payment.belongsTo(Order, { foreignKey: { name: "orderId", onDelete: "CASCADE" }, targetKey: "id", as: "order" });


}


module.exports = initDataBase     