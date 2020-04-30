const express = require("express");
const verifyLocalRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


verifyLocalRouter.post("/localVerify",(req,res,err)=>{
  // Get userkey From The Requested Data In Post

  var userkey = req.query.userkey;

 var getUserKey = `SELECT * FROM usercomputer WHERE computerid = '${userkey}'`;
  mysqlConnection.query(getUserKey,(err,rows,cols)=>{
    if(!err){
      console.log("Successfully Added");
      res.json(rows);
    }
    else {
      console.log("Request Failed ");
    }
  });

});


module.exports = verifyLocalRouter
