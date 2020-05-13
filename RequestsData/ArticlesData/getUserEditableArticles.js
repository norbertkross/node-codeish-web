const express = require("express");
const editableArticlesRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


editableArticlesRouter.post("/editablearticle",(req,res,err)=>{

  var userid = req.query.userid
  console.log(`userid: ${userid}`);

  mysqlConnection.query(`SELECT * FROM Articles WHERE userid = '${userid}' ORDER BY articleId DESC`,
      (err,rows,cols)=>{
         if(!err){
           console.log(rows);
           res.json(rows);
           //res.json("Registration Failed");
         }
  });
});

module.exports = editableArticlesRouter
