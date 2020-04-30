const express = require("express");
const getAllUsersRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


getAllUsersRouter.post("/getallusers",(req,res,err)=>{

  mysqlConnection.query(`SELECT * FROM Users`,
      (err,rows,cols)=>{
         if(!err){
           res.json(rows);
         } 
  });
});

module.exports = getAllUsersRouter
