const express = require("express");
const recoveryRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
const moment = require("moment");


recoveryRouter.get("/PasswordVerification",(req,res,err)=>{

  var uemail = req.query.uemail
  var queryString = req.query.queryString

  var curtime = moment().utc().format('HH:mm:ss')
  var curdate = moment().format('YYYY-MM-DD')

  // Fetch Data From User With Incoming ID
  mysqlConnection.query(`SELECT * FROM Users WHERE email = "${uemail}" `,
      (err,rows,cols)=>{
         if(!err){
           console.log(rows);
// Taking User name and User Pic From The Users Table to INsert Into The Articles Table
           var verificationCode = rows[0].verificationCode;
           var userid = rows[0].userid;
if(rows != null){

  if(verificationCode.toString() == queryString.toString()){
//var timer =
//<meta http-equiv="refresh" content="3;url=https://www.codeish.surge.sh" />

var myQuery = `UPDATE Users SET isVerified = "1" WHERE email = "${uemail}"`;
//When The Users Data Has Been Fetched INSERT The Incoming Data Into VerifyUsers Table
           mysqlConnection.query(myQuery,
               (err,rows,cols)=>{
                  if(!err){
                    res.send(`<!DOCTYPE html>
                      <html>
                      <head>
                      <style>
                      #h1{
                      }
                      </style>
                      <script>

                      setTimeout(function (){
                        window.location = 'https://codeish.surge.sh'
                      },3000);
                      </script>
                      </head>
                      <body><br><br><br><center><h1> Successfully Verified The Email: ${uemail}</h1></center>
                      <b><h4> Wait to be redirected to our homepage </h4></b>
                      </body>
                      </html>`);

    // Add To User Notifications
    const notify = `INSERT INTO Notifications (head,message,msgtime,msgdate,toall,userid) VALUES("Email verification Succeeded","Congrats! You Have Successfully Verified Your Email","${curtime}","${curdate}","0","${userid}" )`;
    mysqlConnection.query(notify,
        (err,rows,cols)=>{
           if(!err){
             console.log(rows);
             //res.json("Successfully Added");
           }else {
             console.log(err);
             //res.json("Failed To Add");

           }
         });

                  }else {
                    console.log(err);
                      res.send(`<br><br><br><center><h1> Something Unexpected Happened, Try again </h1></center>`)
                    //res.json("Failed To Insert Picture Article")
                  }
              });

  }else {

    // Wrong Credentials
    res.send(`<br><br><br><center><h1> Sorry, Could Not Verify This Email: ${uemail}</h1></center>`);

          }

      }
            else {
              // Wrong Credentials
              res.send(`<br><br><br><center><h1> Sorry, Could Not Verify This Email: ${uemail}</h1></center>`)
              //res.json("Failed")
              }
            }
        });

});



module.exports = recoveryRouter
