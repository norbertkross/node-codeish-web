const express = require("express");
const getTemplatesRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


getTemplatesRouter.post("/templates",(req,res,err)=>{

  var userid = req.query.userid

  mysqlConnection.query(`SELECT * FROM Templates`,
      (err,rows,cols)=>{
         if(!err){
           res.json(rows);
           //res.json("Registration Failed");
         }

  });


});

module.exports = getTemplatesRouter
