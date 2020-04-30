const express = require("express");
const adminLoginRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
const encryptPass = require("../EncryptDecrypt/encrypt");


adminLoginRouter.post("/adminlogin",(req,res,err)=>{
  var username = req.query.username
  var passwordRaw = req.query.password

  // ENcrypt Password
var password = encryptPass(passwordRaw.toString());
console.log(`The UID: ${password}`);
mysqlConnection.query(`SELECT * FROM Admins WHERE adminUsername="${username}" AND  passwd ="${password}"`,(err,rows,cols)=>{
         if(!err){
           console.log(rows);
           if(rows.length == 1 ){
             console.log(rows);
              res.json(rows)
           }else {
             res.json(rows);
           }
         }else {
           console.log(err);
         }

  });


});

module.exports = adminLoginRouter
