const express = require("express");
const adminLoginRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
const encryptPass = require("../EncryptDecrypt/encrypt");


adminLoginRouter.post("/updatePassword",(req,res,err)=>{
  var email = req.query.email
  var passwordRaw = req.query.password

  // ENcrypt Password
var password = encryptPass(passwordRaw.toString());

console.log(`The UID: ${password}`);

mysqlConnection.query(`UPDATE Users SET password="${password}" WHERE email="${email}" AND  isVerified ="1"`,
(err,rows,cols)=>{
         if(!err){
           console.log("Successfully Updated password");
           res.json("Successfully Updated password");
         }else {
           console.log(err);
           res.json("Failed. Email may have not been verified");
         }

  });


});

module.exports = adminLoginRouter
