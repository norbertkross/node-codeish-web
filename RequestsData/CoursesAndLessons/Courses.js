const express = require("express");
const coursesRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


coursesRouter.post("/course",(req,res,err)=>{

  mysqlConnection.query(`SELECT * FROM Courses ORDER BY courseid Desc LIMIT 2000`,
      (err,rows,cols)=>{
         if(!err){
           res.json(rows);
         }
  });
});

module.exports = coursesRouter
