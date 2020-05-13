const express = require("express");
const updateArticleRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


updateArticleRouter.post("/updateMyArticle",(req,res,err)=>{

  var articleid = req.query.articleid
  var head = req.query.head
  var body = req.query.body
  var mins = req.query.mins


console.log(`BODY:  \n ${body}`);
console.log(`ARTICLE ID: ${articleid}`);
console.log(`HEADING:  ${head}`);
console.log(`MINS:  ${mins}`);
const myQuery = `UPDATE Articles SET heading=`+`${JSON.stringify(head)},`+`article=${JSON.stringify(body)},`+`mins='${mins}' WHERE articleId='${articleid}'`;

  // const myQuery = `UPDATE Articles SET heading="${head}", article="${body}", mins='${mins}' WHERE articleId='${articleid}'`;

  mysqlConnection.query(
  myQuery,(err,rows,cols) =>{
         if(!err){
           res.json("Successful");
           console.log("Update Successfull");
           //res.json("Registration Failed");

         }else {
           res.json("Request Failed");
           console.log(err);
         }

  });
});

  module.exports = updateArticleRouter
