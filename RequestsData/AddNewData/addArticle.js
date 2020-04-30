const express = require("express");
const addArticleRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
var multer  = require('multer')
var fs = require('fs');
const moment = require("moment");
var upload = multer({ dest: 'uploads/articlepics/' })



addArticleRouter.post("/uploadArticle", upload.single("picture"),(req,res,err)=>{
  // GET Current Date And Time
  var curtime = moment().utc().format('HH:mm:ss')
  var curdate = moment().format('YYYY-MM-DD')

var userid = req.query.userid
var heading = req.query.heading
var body = req.query.body
var mins = req.query.mins
var headerimage = req.query.headerimage

// Appending this before the image directory
var baseurl = req.query.baseurl

// Image Url To Be Inserted Into The DataABse




var getRandomPic = [
    "https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/article%20headings/1600x1200_4x.png?raw=true",
    "https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/article%20headings/2fd6155ad05675cba9731691e145a548.png?raw=true",
    "https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/article%20headings/______-___-________3.jpg?raw=true",
    "https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/article%20headings/gm_styleframe_dribble.jpg?raw=true",
    "https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/article%20headings/img-0422.png?raw=true"
];
// Generate Random Number For Picture
var rand = Math.floor(Math.random() * getRandomPic.length);

var headImg = getRandomPic[rand];

// Random Variable To Attach To File Names
var randName = Math.floor(Math.random() * 199897864369799990);


console.log(`user id : ${userid}`);

if(headerimage != null){
  var filename = req.file.originalname
  var endFile = baseurl+"/art-head/"+ randName+'-'+filename
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
// Taking User name and User Pic From The Users Table to INsert Into The Articles Table
               var author = rows[0].name;
               var pic = rows[0].pic;
if(rows != null){
      const myQuery = `INSERT INTO articles (heading, author, article, arttime, artdate, mins, userpic, headerpic,userid,views) VALUES ("${heading}",  "${author}",  "${body}", '${curtime}',   '${curdate}',   '${mins}', '${pic == null?'http://via.placeholder.com/350x150':pic}', '${endFile}','${userid}','0')`;
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
                }else {
                  res.json("Failed")
                  }
                }
            });

    }

  }).catch((err)=>{
    console.log(err);
   });

}

else {

// Else IF The User Has Not choosen Any New Picture To Send With The Articles

// Fetch Data From User With Incoming ID
mysqlConnection.query(`SELECT * FROM Users WHERE userid = '${userid}'`,
    (err,rows,cols)=>{
       if(!err){
         console.log(rows);
// Taking User name and User Pic From The Users Table to INsert Into The Articles Table
         var author = rows[0].name;
         var pic = rows[0].pic;
         console.log(`name: ${author}  pic: ${pic}`);

if(rows != null){

// When The Users Data Has Been Fetched INSERT The Incoming Data Into Users Table
const myQuery = `INSERT INTO articles (heading, author, article, arttime, artdate, mins, userpic, headerpic,userid) VALUES ("${heading}", "${author}", "${body}",'${curtime}', '${curdate}', '${mins}', '${pic == null?"http://via.placeholder.com/350x150":pic}', '${headImg}','${userid}')`;

         mysqlConnection.query(myQuery,
             (err,rows,cols)=>{
                if(!err){
                  res.json("Article Published Successfully");
                }else {
                  console.log(err);
                  res.json("Failed To Insert NO Picture Article")
                }
            });
}else {
  res.json("Failed")
}
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
      var dest = fs.createWriteStream('uploads/articlepics/' +randName+'-'+ req.file.originalname);
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

module.exports = addArticleRouter
