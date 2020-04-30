const express = require("express");
const passcodeRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


passcodeRouter.post("/passcode",(req,res,err)=>{

  var passCode = req.query.passCode
  var email = req.query.email

  // Fetch Data From User With Incoming ID
  mysqlConnection.query(`SELECT * FROM verifiedusers WHERE verificationCode = "${passCode}" AND email = "${email}" `,
      (err,rows,cols)=>{
         if(!err){
           //console.log(rows);

        if(rows != null && rows.length != 0){

          var verificationCode = rows[0].verificationCode;

          if (passCode == verificationCode) {
            res.json("Verification Successful")
          }else {
            // Invalide Verification Code
            res.json("Invalide Verification Code")
          }

        // Send the User the Verification Code

            }
        else {
              // Wrong PassCode and or Email
              res.json("Code is Invalid! ")
            }

          }else {
            console.log(err);
            res.json("A Problem Occured");
          }

        });
});


module.exports = passcodeRouter
