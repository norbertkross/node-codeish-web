// When The Users Data Has Been Fetched INSERT The Incoming Data Into Users Table
// const myQuery = `INSERT INTO lessons (title, description, videoUrl, typeOf, time, date,userid)
// VALUES ('${title}', '${description}', '${videoUrl}','${typeOf}', '${curtime}', '${curdate}','${userid}')`

const express = require("express");
const addLessonRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
var multer  = require('multer')
var fs = require('fs');
const moment = require("moment");
var upload = multer({ dest: 'uploads/LessonFiles/' })


addLessonRouter.post("/uploadLesson", upload.single("picture"),(req,res,err)=>{
  // GET Current Date And Time
  var curtime = moment().utc().format('HH:mm:ss')
  var curdate = moment().format('YYYY-MM-DD')


var courseid = req.query.courseid
var title = req.query.title
var description = req.query.description
var videoUrl = req.query.videoUrl
var typeOf = req.query.typeOf
var sendfile = req.query.sendfile

// Appending this before the image directory
var baseurl = req.query.baseurl

// Image Url To Be Inserted Into The DataABse

// Random Variable To Attach To File Names
var randName = Math.floor(Math.random() * 199897864369799990);


console.log(`user id : ${courseid}`);

if(sendfile != null){
  var filename = req.file.originalname
  var endFile = baseurl+"/postlsn/"+ randName+'-'+filename
  console.log("end File to add to DB: "+endFile);
  // UPLOAD IMAGE IF headerimage is null thus the user did not choose any header image
  imgUpload(req,randName).then((state)=>{
    if (state == "OK") {
      console.log("yES oK");


  const myQuery = `INSERT INTO Lessons (title, description, videoUrl, typeOf, time, date,courseid) VALUES ("${title}", "${description}", "${endFile}","${typeOf}", '${curtime}', '${curdate}','${courseid}')`
// When The Users Data Has Been Fetched INSERT The Incoming Data Into Users Table
               mysqlConnection.query(myQuery,
                   (err,rows,cols)=>{
                      if(!err){
                        res.json("Lesson Published Successfully");
                      }else {
                        console.log(err);
                        res.json("Failed To Insert Picture Lesson")
                      }
                  });
            }
          }).catch((err)=>{
              console.log(err);
             });
}

else {

// Else IF The User Has Not choosen Any New Picture To Send With The Articles

// INSERT The Incoming Data Into Users Table
const myQuery = `INSERT INTO Lessons (title, description, videoUrl, typeOf, time, date, courseid) VALUES ("${title}", "${description}", '${videoUrl}',"${typeOf}", '${curtime}', '${curdate}','${courseid}')`

         mysqlConnection.query(myQuery,
             (err,rows,cols)=>{
                if(!err){
                  res.json("Article Published Successfully");
                }else {
                  console.log(err);
                  res.json("Failed To Insert NO Picture Article")
                }
            });
          }
      });



var imgUpload = function(req,randName){
  return new Promise((resolve,reject)=>{
    // The Value "Picture" in upload type upload.single("picture") is the parameter in the post request
    console.log("inside Upload Image Method");
      console.log("Received file  " +randName+'-'+ req.file.originalname);
      var src = fs.createReadStream(req.file.path);
      var dest = fs.createWriteStream('uploads/LessonFiles/' +randName+'-'+ req.file.originalname);
      src.pipe(dest);
      src.on('end', function() {
        fs.unlinkSync(req.file.path);

        //res.json('OK: received ' + req.file.originalname);
        resolve("OK")
      });
      src.on('error', function(err) {
        log(err);
        res.json('Something went wrong!'); });
      //reject("NO")
  });
}

module.exports = addLessonRouter
