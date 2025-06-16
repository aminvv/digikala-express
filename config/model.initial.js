const { product, productDetail, productColor, productSize } = require("../module/product/model/product.model");
const sequelize = require("./sequelize.config");

async function initDataBase() {
    product.hasMany(productDetail, { foreignKey: "productId", sourceKey: "id",  as: "details" });
    productDetail.belongsTo(product, { foreignKey: "productId", targetKey: "id" });

    product.hasMany(productColor, { foreignKey: "productId", sourceKey: "id",  as: "colors" });
    productColor.belongsTo(product, { foreignKey: "productId", targetKey: "id" });

    product.hasMany(productSize, { foreignKey: "productId", sourceKey: "id",  as: "sizes" });
    productSize.belongsTo(product, { foreignKey: "productId", targetKey: "id" });


    await sequelize.sync({ alter: true })

}


module.exports = initDataBase  