const express = require("express");
const profileRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


profileRouter.post("/profile",(req,res,err)=>{

  var userid = req.query.userid

  mysqlConnection.query(`SELECT * FROM Users WHERE userid='${userid}'`,
      (err,rows,cols)=>{
         if(!err){
           res.json(rows);
           //res.json("Registration Failed");
         }

  });


});

module.exports = profileRouter
