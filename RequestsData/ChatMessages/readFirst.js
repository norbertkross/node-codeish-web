const express = require("express");
const readFirstRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");


readFirstRouter.post("/readFirst",(req,res,err)=>{


  mysqlConnection.query(`SELECT * FROM ChatMessages ORDER BY chatid Desc LIMIT 2000`,(err,rows,fields)=>{
      if(!err){
          console.log("Successfully Updated Database");

          if(rows != null){
            res.send(rows)
          }

      }else{
        console.log(" Update NOT Successful");
          console.log("This Is The Error logs [\n" +err +"\n]");
          res.send("NO");
      }
  });


});

module.exports = readFirstRouter
