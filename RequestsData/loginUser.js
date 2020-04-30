const express = require("express");
const loginRouter = express.Router();
const mysqlConnection = require("../MysqlConnection/connections");
const encryptPass = require("./EncryptDecrypt/encrypt");


loginRouter.post("/login",(req,res,err)=>{
  // Get Names From The Requested Data In Post

  var email = req.query.email
  var passwordRaw = req.query.password
  var userkey = req.query.userkey

// ENcrypt Password
  var password = encryptPass(passwordRaw.toString());
  console.log(password);


  mysqlConnection.query(`SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`,
      (err,rows,cols)=>{
         if(!err){
           console.log("before rows pass");
           // var pasRes = rows[0].userid;
           //  console.log(`userid: ${rows[0].userid}  length ${rows.length }`);
           if(rows.length == 1 ){

             var userid = rows[0].userid;
             // *703# 0277783408
//Insert The User Computer Details Into UserComputer Table
//REPLACE INTO usercomputer(computerid,userid) VALUES ('aberorsID Giberish','4')
             var getUserKey = `REPLACE INTO usercomputer(computerid, userid) VALUES ('${userkey}','${userid}')`;

             if(userkey != null){
             mysqlConnection.query(getUserKey,(err,rows,cols)=>{
               if(!err){
                 console.log("Successfully Added");
               }
               else {
                 console.log("Request Failed ");
               }
             });
            }

             res.json(rows);
             
           }else{
             res.json("An Error Occured");
           }
         }
         else {
           res.json("Un Expected Error Occured");
         }

  });


});


module.exports = loginRouter
