const express = require("express");
const notificationRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


notificationRouter.post("/notifications",(req,res,err)=>{

  var userid = req.query.userid
  console.log(`userid: ${userid}`);
  mysqlConnection.query(`SELECT * FROM Notifications WHERE userid = '${userid}' OR toall= 1 ORDER BY notid Desc LIMIT 2000`,
      (err,rows,cols)=>{
         if(!err){
           console.log(rows);
           res.json(rows);
           //res.json("Registration Failed");
         }

  });


});

module.exports = notificationRouter
