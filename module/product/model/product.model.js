const { INTEGER, STRING, BOOLEAN, ENUM } = require("@sequelize/core/_non-semver-use-at-your-own-risk_/data-types.js");
const { ProductType } = require("../../../common/constant/product.constant");
const sequelize = require("../../../config/sequelize.config");
const { DataTypes } = require("@sequelize/core");



const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING},
    price: { type: DataTypes.DECIMAL(10,2), allowNull: true },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    active_discount: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    type: { type: DataTypes.ENUM(...Object.values(ProductType)), },
    description: { type: DataTypes.STRING },

}, {
    modelName: "product",
    createdAt: 'create_at',
    updatedAt: 'update_at',
})



const ProductDetail = sequelize.define('product_detail', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    key: { type: DataTypes.STRING, },
    value: { type: DataTypes.STRING, },
    productId: { type: DataTypes.INTEGER, references: { model: product, key: "id" }, allowNull: false },
}, {
    modelName: "product_detail",
    timestamps: false
})



const ProductColor = sequelize.define('product_color', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color_name: { type: DataTypes.STRING, },
    color_code: { type: DataTypes.STRING, },
    productId: { type: DataTypes.INTEGER, references: { model: product, key: "id" }, allowNull: false },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: true },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    active_discount: { type: DataTypes.BOOLEAN, defaultValue: false },


}, {
    modelName: "product_color",
    timestamps: false
})




const ProductSize = sequelize.define('product_size', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.STRING, },
    productId: { type: DataTypes.INTEGER, references: { model: product, key: "id" }, allowNull: false },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: true },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    active_discount: { type: DataTypes.BOOLEAN, defaultValue: false },


}, {
    modelName: "product_size",
    timestamps: false
})




module.exports={
    Product,
    ProductDetail,
    ProductColor,
    ProductSize
} 