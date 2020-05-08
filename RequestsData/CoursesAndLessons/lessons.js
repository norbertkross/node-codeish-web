const express = require("express");
const lessonsRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


lessonsRouter.post("/lessons",(req,res,err)=>{
  var courseid = req.query.courseid;
  console.log(`The CourseID:: ${courseid}`);
  var query1 = `SELECT * FROM Lessons WHERE courseid = '${courseid}' ORDER BY lessonid LIMIT 2000`;
  var query2 = `SELECT * FROM Lessons ORDER BY lessonid LIMIT 2000`;

  console.log(`The Query 1 :: ${query1}`);
  mysqlConnection.query(
    courseid == null?query2:query1,
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
