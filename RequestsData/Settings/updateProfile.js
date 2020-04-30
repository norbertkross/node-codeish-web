const express = require("express");
const updateProfileRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
var multer  = require('multer');
var fs = require('fs');
const moment = require("moment");
var upload = multer({ dest: 'uploads/userpics/' })



updateProfileRouter.post("/updateProfile", upload.single("picture"),(req,res,err)=>{
  // GET Current Date And Time
  var curtime = moment().utc().format('HH:mm:ss')
  var curdate = moment().format('YYYY-MM-DD')

var userid = req.query.userid
var location = req.query.location
var github = req.query.github
var about = req.query.about
var profileimage = req.query.profileimage

// Appending this before the image directory
var baseurl = req.query.baseurl

// Image Url To Be Inserted Into The DataAB
// Random Variable To Attach To File Names
var randName = Math.floor(Math.random() * 199897864369799990);


console.log(`user id : ${userid}`);

if(profileimage == null){
  var filename = req.file.originalname
  var endFile = baseurl+"/us-pif/"+ randName+'-'+filename
  console.log("end File to add to DB: "+endFile);
  // UPLOAD IMAGE IF headerimage is null thus the user did not choose any header image
  imgUpload(req,randName).then((state)=>{
    if (state == "OK") {
      console.log("yES oK");


//const myQuery = `INSERT INTO Users (heading, author, article, arttime, artdate, mins, userpic, headerpic,userid,views) VALUES ('${heading}',  '${author}',  '${body}', '${curtime}',   '${curdate}',   '${mins}', '${pic == null?'http://via.placeholder.com/350x150':pic}', '${endFile}','${userid}','0')`;
const myQuery = `UPDATE Users SET userlocation="${location}", github='${github}' , about="${about}" , pic='${endFile}'  WHERE userid='${userid}'`;

// When The Users Data Has Been Fetched INSERT The Incoming Data Into Users Table
               mysqlConnection.query(myQuery,
                   (err,rows,cols)=>{
                      if(!err){
                        res.json("User Updated");
                      } else {
                        console.log(err);
                        res.json("Failed To Update User")
                      }
                  });

    }

  }).catch((err)=>{
    console.log(err);
   });

}else {

// Else IF The User Has Not choosen Any New Picture To Send With The Articles

console.log("Updating Without Image");
console.log(req.query);
// When The Users Data Has Been Fetched INSERT The Incoming Data Into Users Table
const myQuery = `UPDATE Users SET userlocation='${location}', github='${github}' , about="${about}"  WHERE userid='${userid}' `;

console.log(myQuery);
         mysqlConnection.query(myQuery,
             (err,rows,cols)=>{
                if(!err){
                  console.log("no errors");
                  res.json("Article Published Successfully");
                }else {
                  console.log(err);
                  res.json("Failed To Insert NO Picture Article")
                }
            });

      //     }
      //
      //
      // });

   }

//});

});



var imgUpload = function(req,randName){
  return new Promise((resolve,reject)=>{
    // The Value "Picture" in upload type upload.single("picture") is the parameter in the post request
    console.log("inside Upload Image Method");
      console.log("Received file" +randName+'-'+ req.file.originalname);
      var src = fs.createReadStream(req.file.path);
      var dest = fs.createWriteStream('uploads/userpics/' +randName+'-'+ req.file.originalname);
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


module.exports = updateProfileRouter
