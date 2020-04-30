const express = require("express");
const articlesRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


articlesRouter.post("/allArticles",(req,res,err)=>{

  mysqlConnection.query(`SELECT * FROM Articles ORDER BY articleId Desc LIMIT 2000`,
      (err,rows,cols)=>{
         if(!err){
           res.json(rows);
           //res.json("Registration Failed");
         }else {
           console.log(err);
         }

  });


});

module.exports = articlesRouter
