// var express = require('express')
// var app = express()
// const http = require('http').createServer(app)
const mysqlConnection = require("../../MysqlConnection/connections");






var readChatMessagesAllMessages = function(){
  return new Promise((resolve,reject)=>{

console.log("Executing Fetch Method");


    mysqlConnection.query(`SELECT * FROM ChatMessages ORDER BY chatid Desc LIMIT 2000`,(err,rows,fields)=>{
        if(!err){
            console.log("Successfully Read From Database");

            if(rows != null){
              resolve(JSON.stringify(rows))
            }

        }else{
          console.log(" Read NOT Successful");
            console.log("This Is The Error logs [\n" +err +"\n]");
            reject("NO");
        }
    });
  });
}


module.exports = readChatMessagesAllMessages
