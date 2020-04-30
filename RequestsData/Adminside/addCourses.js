const express = require("express");
const addCourseRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
var multer  = require('multer')
var fs = require('fs');
const moment = require("moment");
var upload = multer({ dest: 'uploads/coursepics/' })


addCourseRouter.post("/uploadCourse", upload.single("picture"),(req,res,err)=>{
  // GET Current Date And Time
  var curtime = moment().utc().format('HH:mm:ss')
  var curdate = moment().format('YYYY-MM-DD')

var title = req.query.title
var description = req.query.description
var price = req.query.price

// Appending this before the image directory
var baseurl = req.query.baseurl


// Random Variable To Attach To File Names
var randName = Math.floor(Math.random() * 199897864369799990);



  var filename = req.file.originalname
  var endFile = baseurl+"/crs-pic/"+ randName+'-'+filename
  console.log("end File to add to DB: "+endFile);
  // UPLOAD IMAGE IF headerimage is null thus the user did not choose any header image
  imgUpload(req,randName).then((state)=>{
    if (state == "OK") {
      console.log("yES oK");

      const myQuery = `INSERT INTO courses (title, description, coursepic, price ) VALUES ("${title}",  "${description}",  "${endFile}", "${price}")`;
// When The Users Data Has Been Fetched INSERT The Incoming Data Into Users Table
               mysqlConnection.query(myQuery,
                   (err,rows,cols)=>{
                      if(!err){
                        res.json("Article Published Successfully");
                      }else {
                        console.log(err);
                        res.json("Failed To Insert Picture Article")
                      }
                  });

                }
            }).catch((err)=>{
              console.log(err);
             });

  });






var imgUpload = function(req,randName){
  return new Promise((resolve,reject)=>{
    // The Value "Picture" in upload type upload.single("picture") is the parameter in the post request
    console.log("inside Upload Image Method");
      console.log("Received file" +randName+'-'+ req.file.originalname);
      var src = fs.createReadStream(req.file.path);
      var dest = fs.createWriteStream('uploads/coursepics/' +randName+'-'+ req.file.originalname);
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

module.exports = addCourseRouter
