const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../../config/sequelize.config");

const Role = sequelize.define("role", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING,allowNull:true},
}, { modelName: "role",timestamps: false,});


const Permission = sequelize.define("permission", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING,allowNull:true},
}, { modelName: "permission",timestamps: false,});


const RolePermission = sequelize.define("rolePermission", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    roleId: {type: DataTypes.STRING, allowNull: false},
    permissionId: {type: DataTypes.STRING,allowNull:false},
}, { modelName: "rolePermission",timestamps: false,});


module.exports = {
Role,
Permission,
RolePermission,
};