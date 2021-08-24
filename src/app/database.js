const mysql = require("mysql2")
const config = require("./config")

const pool = mysql.createPool({
    port:config.MYSQL_PORT,
    user:config.MYSQL_USER,
    password:config.MYSQL_PASSWORD,
    database:config.MYSQL_DATABASE,
})

// const pool = mysql.createPool({
//     port:3306,
//     user:"root",
//     password:"459979178Lzp",
//     database:"hub",
// })

pool.getConnection((err,conn)=>{
    conn.connect((err)=>{
        if(err){
            console.log("数据库连接失败");
        }else{
            console.log("数据库连接成功");
        }
    })
})

module.exports = pool.promise()

