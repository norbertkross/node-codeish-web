const express = require("express");
const sendNotificationRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
const moment = require("moment");

sendNotificationRouter.post("/sendnotifications",(req,res,err)=>{
  // GET Current Date And Time
  var curtime = moment().utc().format('HH:mm:ss')
  var curdate = moment().format('YYYY-MM-DD')


  var userid = req.query.userid
  var head = req.query.head
  var message = req.query.message
  var toall = req.query.toall



console.log(`userid: ${userid}`);
//"${userid == 0?null:userid}"
const myQuery = `INSERT INTO Notifications (head,message,msgtime,msgdate,toall,userid) VALUES("${head}","${message}","${curtime}","${curdate}","${toall}",${userid == 0?null:`"${userid}"`})`;


  mysqlConnection.query(myQuery,
      (err,rows,cols)=>{
         if(!err){
           console.log(rows);
           res.json("Successfully Added");
         }else {
           console.log(err);
           res.json("Failed To Add");

         }
       });
});

module.exports = sendNotificationRouter
