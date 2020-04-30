var multer = require('multer')
var sftpStorage = require('multer-sftp')

exports.newFileUpload =  function(req , res , next){
    var storage = sftpStorage({
      sftp: {
        host: 'ftp.codeish.live',
        port: 22,
        username: 'u951177032.norbert',
        password: 'norbert'

      },
      destination: function (req, file, cb) {
        cb(null, '/home/u951177032/domains/codeish.live/norbertkross')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
      }
    })

    var upload = multer({ storage: storage }).array('file');

    upload(req,res,function(err){
        logger.debug(JSON.stringify(req.body));
              logger.debug(JSON.stringify(req.files));
          if(err){
               logger.debug("Error Occured", JSON.stringify(err));
               res.json({error_code:1,err_desc:err});
          } else{
               logger.debug("Files uploaded successfully");
              res.json({error_code:0,err_desc:null});
          }
      });
}
