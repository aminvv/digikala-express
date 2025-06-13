const { default: Sequelize } = require("@sequelize/core");
const { config } = require("dotenv");
config()
const sequelize=new Sequelize({
    dialect:"mariadb",
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    logging:false
})

sequelize.authenticate().then(async()=>{
    sequelize.sync({alter:true})
    console.log('connected to mariaDB');
}).catch((err)=>{
    console.log(' cannot connected  to mariaDB error:',err?.message); 
})


module.exports={
    sequelize
}