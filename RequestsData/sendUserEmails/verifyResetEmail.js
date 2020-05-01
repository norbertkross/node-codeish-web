const express = require("express");
const verifyResetRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
const sendCode = require("./sendPasscode");



verifyResetRouter.post("/verifyResetEmail",(req,res,err)=>{

  var uemail = req.query.uemail

  var verificationCode = Math.floor(Math.random() * 979899);


  if(uemail != null){

    mysqlConnection.query(`SELECT * FROM Users where email = "${uemail}"`,
        (err,rows,cols)=>{

           if(!err){
             //res.json(rows);
             if (rows != null && rows.length != 0) {
               var email = rows[0].email;
               var name = rows[0].name;

//REPLACE INTO
               mysqlConnection.query(`REPLACE INTO VerifiedUsers (verifyid,email,verificationCode) VALUES ('null',"${email}","${verificationCode}")`,
                   (err,rows,cols)=>{
                      if(!err){

                        res.json("A Verification Code Has Been Sent To Email. Continue.");

                        //sendCode(email,name,verificationCode /*userEmail,theusername,vefCode*/);
                      }else {
                        console.log(err);
                        res.json("A Problem Occured");
                      }

               });


             }else {

               res.json(" Sorry, User does not exist");
               //console.log(err);
             }
             //res.json("Registration Failed");
           }else {
             console.log(err);
             res.json("A Problem Occured");
           }

    });
  }

});


module.exports = verifyResetRouter
