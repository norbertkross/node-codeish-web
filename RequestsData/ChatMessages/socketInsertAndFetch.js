const mysqlConnection = require("../../MysqlConnection/connections");


var executeSendMessage = function(dataFromClient){
  return new Promise((resolve,reject)=>{

    console.log("\nsayin Bye Bye ...\n ... Inside onlyUpdateUserLoc");
    console.log(`update_driver  ${dataFromClient["update_driver"]}\n`);
    console.log(`lat  ${dataFromClient["lat"]}\n`);
    console.log(`lng  ${dataFromClient["lng"]}\n`);
    console.log(`_id_  ${dataFromClient["_id_"]}\n`);



    mysqlConnection.query(`UPDATE _drivers_location_ SET lat=${dataFromClient["lat"] !=null?dataFromClient["lat"]:-3.78736},lng =${dataFromClient["lng"] !=null?dataFromClient["lng"]:11.775450} WHERE id=${dataFromClient["_id_"] !=null?dataFromClient["_id_"]:12}`,(err,rows,fields)=>{
        if(!err){
            console.log("Successfully Updated Database");
            var successful = "Successful";
            resolve(dataFromClient)
        }else{
          console.log(" Update NOT Successful");
            console.log("This Is The Error logs [\n" +err +"\n]");
            var errorMsg = "Error";
            reject(JSON.stringify(errorMsg));
        }
    });
  });
}


module.exports = executeSendMessage
