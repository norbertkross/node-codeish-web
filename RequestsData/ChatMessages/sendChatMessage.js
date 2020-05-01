const express = require("express");
const sendChatMessageRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
var multer  = require('multer');
var fs = require('fs');
const moment = require("moment");
var upload = multer({ dest: 'uploads/MessagePic/' })





sendChatMessageRouter.post("/sendChatMessage", upload.single("picture"),(req,res,err)=>{
  // GET Current Date And Time
  var curtime = moment().utc().format('HH:mm:ss')
  var curdate = moment().format('YYYY-MM-DD')

  console.log(`\nCurtime: ${curtime}`);
  var userid = req.query.userid
  var messageText = req.query.messageText
  var ispic = req.query.ispic

  // Appending this before the image directory
  var baseurl = req.query.baseurl

  // Random Variable To Attach To File Names
  var randName = Math.floor(Math.random() * 199897864369799990);


  if(ispic != null){
    var filename = req.file.originalname
    var endFile = baseurl+"/msg-pic/"+ randName+'-'+filename
    console.log("end File to add to DB: "+endFile);


    // UPLOAD IMAGE IF headerimage is null thus the user did not choose any header image
    imgUpload(req,randName).then((state)=>{
      if (state == "OK") {
        console.log("yES oK");

        // Fetch Data From User With Incoming ID
        mysqlConnection.query(`SELECT * FROM Users WHERE userid = '${userid}'`,
            (err,rows,cols)=>{

              if(!err){
                console.log(rows);

        if (rows != null){
// Taking User name and User Pic From The Users Table to INsert Into The Articles Table
               var usersname = rows[0].name;
               var pic = rows[0].pic;

               const myQuery = `INSERT INTO ChatMessages (usersname, msg, pictureMsg, time, date, userPicture, userid ) VALUES ("${usersname}","${messageText}","${endFile}",'${curtime}','${curdate}','${pic}','${userid}')`;

              mysqlConnection.query(myQuery,
                  (err,rows,cols)=>{
                     if(!err){
                       res.json("User Updated");
                     } else {
                       console.log(err);
                       res.json("Failed To Update User")
                     }
                 });
        }else {
          res.json("Failed")
        }
              }else {
                res.json("Failed")
              }
            });
         }
    }).catch((err)=>{
      console.log(err);
     });

  } else {

  // Else IF The User Has Not choosen Any New Picture To Send With The Articles
console.log(`The userid: ${userid}`);
  // Fetch Data From User With Incoming ID
  mysqlConnection.query(`SELECT * FROM Users WHERE userid = "${userid}"`,
      (err,rows,cols)=>{

        if(!err){
          console.log(rows);

// Taking User name and User Pic From The Users Table to INsert Into The Articles Table
if (rows.length != 0){
          var usersname = rows[0].name;
          var pic = rows[0].pic;

          const myQuery = `INSERT INTO ChatMessages (usersname, msg, pictureMsg, time, date, userPicture, userid ) VALUES ("${usersname}","${messageText}","none",'${curtime}','${curdate}',"${pic}",'${userid}')`;

         mysqlConnection.query(myQuery,
             (err,rows,cols)=>{
                if(!err){
                  res.json("Message Sent");
                } else {
                  console.log(err);
                  res.json("Failed To Send Message")
                }
            });
          }else {
            res.json("Failed to send")
          }

        }else {
          res.json("Failed")
          }
      });
    }
});



var imgUpload = function(req,randName){
  return new Promise((resolve,reject)=>{
    // The Value "Picture" in upload type upload.single("picture") is the parameter in the post request
    console.log("inside Upload Image Method");
      console.log("Received file" +randName+'-'+ req.file.originalname);
      var src = fs.createReadStream(req.file.path);
      var dest = fs.createWriteStream('uploads/MessagePic/' +randName+'-'+ req.file.originalname);
      src.pipe(dest);
      src.on('end', function() {
        fs.unlinkSync(req.file.path);

        //res.json('OK: received ' + req.file.originalname);
        resolve("OK")
      });
      src.on('error', function(err) { res.json('Something went wrong!'); });
      //reject("NO")
  });
}



module.exports = sendChatMessageRouter
