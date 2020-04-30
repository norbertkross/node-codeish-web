const express = require("express");
const uploadRouter = express.Router();
var multer  = require('multer')
var fs = require('fs');
var upload = multer({ dest: 'uploads/' })

var multer = require('multer')
var sftpStorage = require('multer-sftp')
// var ftpClient = require('ftp-client'),
var client = require('scp2')
//
//
//     config = {
//         host: 'ftp.codeish.live',
//         port: 21,
//         user: 'u951177032.norbert',
//         password: 'norbert',
//         connTimeout: 10000,
//         pasvTimeout: 10000,
//         aliveTimeout: 10000
//     },
//
//     options = {
//         logging: 'basic'
//     },
//
// client = new ftpClient(config, options);
//





uploadRouter.post('/upload', upload.single("picture"), function (req,res) {
  // The Value "Picture" in upload type upload.single("picture") is the parameter in the post request

  //   var src = fs.createReadStream(req.file.path);
  //   var dest = fs.createWriteStream('uploads/' + req.file.originalname);
  //   src.pipe(dest);
  //
  // client.connect(function () {
  //   console.log("Before client");
  //     client.upload(req.file.originalname, 'norbertkross', {
  //         baseDir: '/home/u951177032/domains/codeish.live/norbertkross',
  //         overwrite: 'older'
  //     }, function (result) {
  //         console.log(result);
  //     });
  //
  //   });

  // var storage = sftpStorage({
  //   sftp: {
  //     host: 'ftp.codeish.live',
  //     port: 21,
  //     username: 'u951177032.norbert',
  //     password: 'norbert'
  //
  //   },
  //   destination: function (req, file, cb) {
  //     cb(null, '/norbertkross')
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.fieldname + '-' + Date.now())
  //   }
  // })
  //
  // var upload = multer({ storage: storage }).array('file');




  var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
       cb(null, 'norbertkross/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null,  datetimestamp+ '-' +file.originalname);
    }
});
      var upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 }}).array('file');
      upload(req,res,function(err){
              console.log(req.body);
              console.log(req.files);
          if(err){
              res.json({error_code:1,err_desc:err});
              console.log("Error Occured", err);
              return;
          }else{


              client.scp(req.file.path, {
                  // host: 'ftp.codeish.live',
                  // username: 'u951177032.norbert',
                  // password: 'norbert',
                  // path: '/home/u951177032/domains/codeish.live/norbertkross'
                  host: 'ftp.codeish.live',
                  username: 'u951177032.aberor',
                  password: 'norbertkross',
                  path: '/home/u951177032/domains/codeish.live/norbertkross'

              }, function(err) {
                if(!err){

                console.log(req.file.path);
                  console.log("files uploaded in remote server");}
                  else {
                    console.log(err);
                  }
              });
          }
    // upload()
  // upload(req,res,function(err){
  //     logger.debug(JSON.stringify(req.body));
  //           logger.debug(JSON.stringify(req.files));
  //       if(err){
  //            logger.debug("Error Occured", JSON.stringify(err));
  //            res.json({error_code:1,err_desc:err});
  //       } else{
  //            logger.debug("Files uploaded successfully");
  //           res.json({error_code:0,err_desc:null});
  //       }
  //   });
  // console.log("inside Upload Image Method");
  //   console.log("Received file" + req.file.originalname);
  //   var src = fs.createReadStream(req.file.path);
  //   var dest = fs.createWriteStream('uploads/' + req.file.originalname);
  //   src.pipe(dest);
  //   src.on('end', function() {
  //   	fs.unlinkSync(req.file.path);
  //
  //     // To Add theFileName into database to link to location of image on server
  //     const theFileName = req.file.originalname;
  //
  //   	res.json('OK: received ' + req.file.originalname);
  //   });
  //   src.on('error', function(err) { res.json('Something went wrong!'); });



  });

});
  module.exports = uploadRouter;
