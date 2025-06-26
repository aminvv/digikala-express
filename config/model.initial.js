const { Product, ProductDetail, ProductColor, ProductSize } = require("../module/product/model/product.model");
const { Otp, User } = require("../module/user/model/user.model");
const sequelize = require("./sequelize.config");

async function initDataBase() {
    Product.hasMany(ProductDetail, { foreignKey: "productId", sourceKey: "id",  as: "details" });
    ProductDetail.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });

    Product.hasMany(ProductColor, { foreignKey: "productId", sourceKey: "id",  as: "colors" });
    ProductColor.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });

    Product.hasMany(ProductSize, { foreignKey: "productId", sourceKey: "id",  as: "sizes" });
    ProductSize.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });


    User.hasOne(Otp,{foreignKey:"userId" ,sourceKey:"id" ,as:"otp"})
    Otp.belongsTo(User,{foreignKey:"userId" ,targetKey:"id" })

    await sequelize.sync({ alter: true })

}


module.exports = initDataBase     