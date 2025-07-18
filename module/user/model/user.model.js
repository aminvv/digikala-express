const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../../config/sequelize.config");

const User=sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    fullname:{type:DataTypes.STRING,allowNull:true},
    roleId:{type:DataTypes.INTEGER,allowNull:true},
    mobile:{type:DataTypes.STRING,allowNull:false},
    otpId:{type:DataTypes.INTEGER,allowNull:true},
},{
    modelName:"user",
    
})


const Otp=sequelize.define("user_otp",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    userId:{type:DataTypes.INTEGER,allowNull:false},
    code:{type:DataTypes.STRING,allowNull:false},
    expires_in:{type:DataTypes.DATE,allowNull:false},

 },{
    modelName:"user_otp",
    timestamps:false
 })



 module.exports={
    User,  
    Otp
 }