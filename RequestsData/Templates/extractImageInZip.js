
const StreamZip = require('node-stream-zip');
var fs = require("fs");
const express = require("express");
const extractRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
var multer  = require('multer')
const moment = require("moment");
var upload = multer({ dest: 'uploads/webTemplateZips/' })

//webTemplateZips

extractRouter.post("/extractFile", upload.single("picture"), (req,res,err)=>{
  // GET Current Date And Time
  var curtime = moment().utc().format('HH:mm:ss')
  var curdate = moment().format('YYYY-MM-DD')

  // Random Variable To Attach To File Names
  var randName = Math.floor(Math.random() * 199897864369799990);

  var rnd = randName
  // console.log(`user id : ${courseid}`);
  var filename = req.file.originalname
  //var endFile = baseurl+ "/webtemplate/ "+ randName+'-'+filename
  // console.log("end File to add to DB: "+endFile);


  // manipulateZip();

  zipUpload(req,randName).then((state)=>{

    if (state == "OK"){
      console.log(`yes OK`);
      manipulateZip(res,req,rnd)
      .then((state)=>{

        fs.unlink("./uploads/WebTemplateZips/"+rnd+"-"+req.file.originalname, (err) =>{
          if (err) throw err;
          console.log(`successfully deleted  ${"./uploads/WebTemplateZips/"+rnd+"-"+req.file.originalname}`);
        });

      }).catch((err)=>{
          console.log(err);
         });
    }else {
        res.json("Failed To Add File")
    }
  });

});

// /// Method TO Handle Extraction

var  manipulateZip = async function(res,req,randName){
console.log(`random in Extract: ${randName}`);

console.log(`File TO Be Extracted:=>  ./uploads/WebTemplateZips/${randName}-${req.file.originalname}`);



//////}

// Open A Zip File
const zip = new StreamZip({
    file: "./uploads/WebTemplateZips/"+randName+"-"+req.file.originalname,
    //+randName+"-"+req.file.originalname,
    storeEntries: true
});

// Handle errors
zip.on('error', err => {
  console.log("There is an Error");
  console.log(`ERROR MSG:  ${err}`);
/*...*/
//reject("NO");
});


//Extract a folder from archive to disk
zip.on('ready', () => {
  console.log("Ready");
  console.log("Read to Extract To folder");

    //Get FolderName From File
    var str = randName+"-"+ req.file.originalname;
    // length Of String
    var lenStr = str.length
    var folderName = str.substring(0,lenStr-4);
    console.log(`FolderName: ${folderName}`);

    fs.mkdirSync('./uploads/WebTemplateZips/'+folderName);
    console.log("Made a directory extracted");
    zip.extract(null, './uploads/WebTemplateZips/'+folderName, err => {
        console.log(err ? 'Extract error' : 'Extracted');

        //Get FolderName From File
        var fl = randName+"-"+ req.file.originalname;
        // length Of String
        var flStr = fl.length
        var folderName = fl.substring(0,flStr-4);
        console.log(folderName);

        // Get File Name - minus .zip
        var fn = req.file.originalname;
        var fnlen = fn.length
        var unZipfileName = fn.substring(0,fnlen-4);
        console.log(`FolderNameUnzip: ${unZipfileName}`);
        fs.readdir("./uploads/WebTemplateZips/"+folderName+"/"+unZipfileName+"/images/", (err, files) => {
          if(!err){
            // files.forEach(file => {
            //   console.log(file);
            // });

            console.log(`THE IMAGE: ${files[0]}`);
            insertTempl(res,req,folderName+"/"+unZipfileName+"/images/"+files[0],"./uploads/WebTemplateZips/"+folderName);
          }else {
            console.log(`There was An Error : ${err}`);
          }
        });

        zip.close();
    });

    });


  }



// Add ZIP file to DB
var zipUpload = function(req,randName){
  return new Promise((resolve,reject)=>{
    // The Value "Picture" in upload type upload.single("picture") is the parameter in the post request
    console.log("inside Upload Image Method");
    console.log(`random in Upload: ${randName}`);
      console.log("Received file  " +randName+'-'+ req.file.originalname);
      var src = fs.createReadStream(req.file.path);
      var dest = fs.createWriteStream('uploads/WebTemplateZips/' +randName+'-'+ req.file.originalname);
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


var insertTempl = function(res,req,remainingPath,folderName){

  var userid = req.query.userid
  var title = req.query.title
  var description = req.query.description

  // Appending this before the image directory
  var baseurl = req.query.baseurl


var endFile = baseurl+"/webtem/"+remainingPath
console.log(`URL: ${endFile}`);
console.log(`FOlder TO DATABASE:  ${folderName}`);
   //INSERT The Incoming Data Into Users Table
    const myQuery = `INSERT INTO Templates (title,description,time, date,picture,folderUrl,userid) VALUES ("${title}", "${description}", '${curtime}','${curdate}', '${endFile}',"${folderName}",'${userid}')`

             mysqlConnection.query(myQuery,
                 (err,rows,cols)=>{
                    if(!err){
                      res.json("Article Published Successfully");
                    }else {
                      console.log(err);
                      res.json("Failed To Add File")
                    }
                });

}


module.exports = extractRouter
