const mysql = require("mysql");




const mysqlConnection = mysql.createPool({
  host:"sql262.main-hosting.eu",
  //"2.57.89.176",//"mysql.hostinger.com",2.57.89.176
  //"2.57.89.176",//// ip address of server running mysql// or replace with server ip address//
  user:"u951177032_norbertkross",
  password:"cscodelab_norbertkross",
  database: "u951177032_codeish",
  multipleStatements: true,
});


mysqlConnection.on('connection', function (connection) {
  console.log("... connected");
});

mysqlConnection.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});





//This Method Can Not Handle Errors Authomatically When The Server Closes The Connection
// var mysqlConnection = mysql.createConnection({
//     host:"127.0.0.1",
//     //"2.57.89.176",//"mysql.hostinger.com",2.57.89.176
//     //"2.57.89.176",//// ip address of server running mysql// or replace with server ip address//
//     user:"root",
//     password:"",
//     database: "codeishweb",
//     multipleStatements: true,
// });
//
// mysqlConnection.connect((err)=>{
//     if(!err){
//         console.log("Succeeded");
//     }else{
//         console.log("connection failed");
//         console.log(`CONNECTION ERROR: ${err}`);
//     }
// });



module.exports = mysqlConnection;
