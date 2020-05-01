const express = require("express");
const articlesIdRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");



articlesIdRouter.post("/thisArticle",(req,res,err)=>{
  var articleId = req.query.articleId


// Increment Article Views
  var qry = `UPDATE Articles SET views = views+1 WHERE articleId ='${articleId}'`;
    mysqlConnection.query(qry,
        (err,rows,cols)=>{
           if(!err){

          var sql = `SELECT * FROM Articles WHERE articleId = '${articleId}'; SELECT * FROM Articles ORDER BY RAND() LIMIT 4`
          // Take Article From DataBase And Send To Users
          mysqlConnection.query(sql,
              (err,rows,cols)=>{
                 if(!err){
                   res.send(rows);
                   //res.json("Registration Failed");
                 }else{
                   console.log(err);
                 }

          });

           }

    });

});

module.exports = articlesIdRouter
