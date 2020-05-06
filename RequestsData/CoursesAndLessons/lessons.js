const express = require("express");
const lessonsRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


lessonsRouter.post("/lessons",(req,res,err)=>{
  var lessonid = req.query.lessonid
  var query1 = `SELECT * FROM Lessons WHERE lessonid = '${lessonid}' ORDER BY lessonid LIMIT 2000`;
  var query2 = `SELECT * FROM Lessons ORDER BY lessonid LIMIT 2000`;
  mysqlConnection.query(
    lessonid == null?query2:query1,
    //`SELECT * FROM Lessons WHERE courseid = '${courseid}'`,
      (err,rows,cols)=>{
         if(!err){
           res.json(rows);
           //res.json("Registration Failed");
           console.log(err);
         }

  });


});

module.exports = lessonsRouter
