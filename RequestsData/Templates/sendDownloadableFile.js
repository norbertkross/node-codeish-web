const express = require("express");
var fs = require("fs");
const sendDownloadableRouter = express.Router();
const mysqlConnection = require("../../MysqlConnection/connections");
var Archiver = require('archiver');

sendDownloadableRouter.get("/sendDownload",(req,res,err)=>{
  console.log("sending...");
  //var folderpath = req.query.folderpath

  var folderpath = req.query.folderpath
  console.log(`userid: ${folderpath}`);

  var flStr = folderpath.length
  var zipFileName = folderpath.substring(26,flStr);
  console.log(zipFileName);


fs.readdir("./RequestsData/Templates/extracted/", (err, files) => {
  if (!err) {
  var fname = files[0];
  console.log("fname "+ fname);
  fs.rename(`./RequestsData/Templates/extracted/${fname}`,`./RequestsData/Templates/extracted/${zipFileName}.zip`,(err)=>{
    if (!err) {
      // Tell the browser that this is a zip file.
      res.writeHead(200, {
          'Content-Type': 'application/zip',
          'Content-disposition': `attachment; filename=${zipFileName}.zip`
      });


      var archive = Archiver('zip');

        // Send the file to the page output.
      archive.pipe(res);


      console.log("Directory");
            // append files from a sub-directory, putting its contents at the root of archive
      archive.directory(folderpath, false);

      archive.finalize();

    }else{
      console.log("THERE'S AN   "+err);
    }
  });

  }

});

});

module.exports = sendDownloadableRouter
