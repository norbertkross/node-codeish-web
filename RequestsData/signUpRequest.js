const express = require("express");
const signUpRouter = express.Router();
const mysqlConnection = require("../mysqlConnection/connections");
const encryptPass = require("./EncryptDecrypt/encrypt");
const mailReovery = require("./sendUserEmails/emailConfirmation");
const moment = require("moment");

signUpRouter.post("/register",(req,res,err)=>{

var time = moment().utc().format('HH:mm:ss')
var date = moment().format('YYYY-MM-DD')

var randomPasswordRecoveryCode = Math.floor(Math.random() * 199897864369799990);


  // Get Names From The Requested Data In Post
  var name = req.query.name
  var email = req.query.email
  var pic = req.query.pic
  var passwordRaw = req.query.password
  var baseurl = req.query.baseurl

// ENcrypt Password
  var password = encryptPass(passwordRaw.toString())

  var uid =   randomPasswordRecoveryCode+email;

  console.log(req.query);

  var getRandomPic = [
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-circled-user-male-skin-type-5-48.png?raw=true",
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-customer-64.png?raw=true",
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-life-cycle-64.png?raw=true",
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-male-user-64.png?raw=true",
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-name-64.png?raw=true",
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-person-64.png?raw=true",
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-test-account-64.png?raw=true",
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-user-male-skin-type-6-48.png?raw=true",
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-user-male-skin-type-7-48 (1).png?raw=true",
"https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/gitload/icons8-user-male-skin-type-7-48.png?raw=true"
  ];

  // Generate Random Number For Picture
  var rand = Math.floor(Math.random() * getRandomPic.length);

  var headImg = getRandomPic[rand];


 mysqlConnection.query(`SELECT COUNT(1) AS UserExist FROM users WHERE email = "${email}"`,
 (err,rows,cols)=>{


// Very the email to know a user already Exists with such email
       if(!err){
           //res.send(rows);
           var alreadyExists = rows[0].UserExist;
           if( alreadyExists>0 ){

             res.json("User already Exists");
             console.log(alreadyExists);

           }else{
             console.log(alreadyExists);

// Add new user if the user does not Exists
              console.log(`The Random Recovery Number: ${randomPasswordRecoveryCode}`);

// Parser Error if no Single Quotes around variable putting single quotes around your values, so you're doubling that up by adding them yourself
                 mysqlConnection.query(`INSERT INTO Users (userid,name, email, password, pic, verificationCode,isVerified, Time, Date,userlocation,github,about,joinedOn) VALUES ("${uid}","${name}", "${email}", '${password}', '${pic == null?headImg:pic}', '${randomPasswordRecoveryCode}','0','${time}','${date}','No Location','github.com','No Description or About Yet ','${date}')`,
                 (err,rows,fields)=>{
                     if(!err){
                         res.json("Registration Succeeded");

                         console.log(`The Random Recovery Number second: ${randomPasswordRecoveryCode}`);

                         mailReovery(`${baseurl}/PasswordVerification?uemail=${email}&queryString=${randomPasswordRecoveryCode.toString()}`,email,name);

                     }else{
                         console.log("This Is The Error logs [\n" +err +"\n]");
                         res.json("Registration Failed");
                     }
                 });
           }

       }else{
           console.log("This Is The Error logs [\n" +err +"\n]");
           res.json("Registration Failed");
       }

 });


  });

module.exports = signUpRouter
