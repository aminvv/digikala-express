const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../../config/sequelize.config");

const RefreshTokenModel=sequelize.define('refresh_token',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    token:{type:DataTypes.TEXT,allowNull:false},
    userId:{type:DataTypes.INTEGER,allowNull:true},
},{
    modelName:"refresh_token",
    
})



 module.exports={
    RefreshTokenModel,  
    
 }