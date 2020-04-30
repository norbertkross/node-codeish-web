const express = require("express");
const updateArticleRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


updateArticleRouter.post("/updateMyArticle",(req,res,err)=>{

  var articleid = req.query.articleid
  var head = req.query.head
  var body = req.query.body
  var mins = req.query.mins

console.log(`ARTICLE ID: ${articleid}`);
console.log(`HEADING:  ${head}`);

console.log(`BODY:  \n ${body}`);

console.log(`MINS:  ${mins}`);
  const myQuery = `UPDATE articles SET heading="${head}", article='${body}', mins='${mins}' WHERE articleId='${articleid}'`;

  mysqlConnection.query(
  myQuery,(err,rows,cols) =>{
         if(!err){
           res.json("Successful");
           //res.json("Registration Failed");
           console.log(err);
         }else {
           res.json("Request Failed");
         }

  });
});

  module.exports = updateArticleRouter
