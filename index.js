var express = require('express')
var app = express()
const http = require('http').createServer(app)
//const io = require('socket.io')(http)
var cors = require('cors')
const fs = require('fs');
const path = require('path');

// My Defined Routes
const register = require('./RequestsData/signUpRequest')
const login = require('./RequestsData/loginUser')
const notifications = require('./RequestsData/Notifications/notification')
const allArticles = require('./RequestsData/ArticlesData/allArticles')
const articlesId = require('./RequestsData/ArticlesData/specificArticle')
const courses = require('./RequestsData/CoursesAndLessons/Courses')
const lessons = require('./RequestsData/CoursesAndLessons/lessons')
const verifyUserLocal = require('./RequestsData/VerifyUserLocal/verifyUserLocal')
const uploadFile = require('./RequestsData/FileUpload/uploadScript')
const addArticle = require('./RequestsData/AddNewData/addArticle')
const getProfile = require('./RequestsData/Settings/userprofile')
const updateProfile = require('./RequestsData/Settings/updateProfile')
const adminProfile = require('./RequestsData/Adminside/adminLogin')
const addCourses = require('./RequestsData/Adminside/addCourses')
const addLessons = require('./RequestsData/Adminside/addLessons')
const sendNotification = require('./RequestsData/Notifications/SendNotification')
const getAllUsers = require('./RequestsData/Notifications/getAllUsers')
const editableArticle = require('./RequestsData/ArticlesData/getUserEditableArticles')
const updateArticle = require('./RequestsData/ArticlesData/editarticle')
const getTemplates = require('./RequestsData/Templates/getTemplates')
const extractZip = require('./RequestsData/Templates/extractImageInZip')
const dowmloadZip = require('./RequestsData/Templates/sendDownloadableFile')
const sendChatMessage = require('./RequestsData/ChatMessages/sendChatMessage')
const readChatMessages = require('./RequestsData/ChatMessages/readMessages')
const readFirst = require('./RequestsData/ChatMessages/readFirst')
const passwordRecovery = require('./RequestsData/sendUserEmails/handleVerificationUrl')
const passcode = require('./RequestsData/sendUserEmails/passcode')
const verifyResetEmail = require('./RequestsData/sendUserEmails/verifyResetEmail')
const updatePassword = require('./RequestsData/sendUserEmails/updatePassword')
const specificLesson = require('./RequestsData/CoursesAndLessons/specificLesson')



app.use(cors())

//Use this folder [website] whenever the user requests for the "/" route
// otherwise  content in the HTML file that point to other files cant be read
app.use('/', express.static(path.join(__dirname, 'website')));
// app.use('/resumfolio', express.static(path.join(__dirname, 'website')));

// whenever the user requests for "/" send the HTML homepage to him
app.get('/', (req, res,err) => {
    //res.send("<h1>NO DATA AVAILABLE HERE")
    res.sendFile(__dirname + '/website/index.html');
  });

// // whenever the user requests for "/resumfolio" send the HTML homepage to him
// app.get('/resumfolio', (req, res,err) => {
//     //res.send("<h1>NO DATA AVAILABLE HERE")
//     res.sendFile(__dirname + '/website/index.html');
//   });



//app.use(express.static(__dirname + '/uploads/'));
//app.use('/', express.static(__dirname+'/website/index.html')); // you can access image using this url: http://localhost:7000/us-pif/abc.jpg
//Or you can change the directory for hiding real directory name:
app.use('/us-pif', express.static(__dirname+'/uploads/userpics')); // you can access image using this url: http://localhost:7000/us-pif/abc.jpg
app.use('/art-head', express.static(__dirname+'/uploads/articlepics'));
app.use('/crs-pic', express.static(__dirname+'/uploads/coursepics'));
app.use('/postlsn', express.static(__dirname+'/uploads/LessonFiles'));
app.use('/webtem', express.static(__dirname+'/uploads/webTemplateZips'));
app.use('/msg-pic', express.static(__dirname+'/uploads/MessagePic'));
app.use('/strp-dwn', express.static(__dirname+'/uploads/0.2'));
app.use('/vid-playr-pic', express.static(__dirname+'/uploads/videoplayerFiles'));


// My Defined  File Routes
      app.use(register);

      app.use(login)

      app.use(notifications)

      app.use(allArticles)

      app.use(articlesId)

      app.use(courses)

      app.use(lessons)

      app.use(verifyUserLocal)

      app.use(uploadFile)

      app.use(addArticle)

      app.use(getProfile)

      app.use(updateProfile)

      app.use(adminProfile)

      app.use(addCourses)

      app.use(addLessons)

      app.use(sendNotification)

      app.use(getAllUsers)

      app.use(editableArticle)

      app.use(updateArticle)

      app.use(getTemplates)

      app.use(extractZip)

      app.use(dowmloadZip)

      app.use(sendChatMessage)

      app.use(readFirst)

      app.use(passwordRecovery)

      app.use(passcode)

      app.use(verifyResetEmail)

      app.use(updatePassword)

      app.use(specificLesson)

      //readChatMessages



  //Socket IO  Logic
    const socketio = require('socket.io')(http)

    socketio.on("connection", (userSocket) => {
           console.log("a user connected the socket Id: "+userSocket.id);

             userSocket.on("send_message", (data) => {
               console.log("The Data "+"["+ data+"]");

               readChatMessages().then((dbResults)=>{

                 if(dbResults != "NO"){
                   console.log("Theres Some Data From DB ");
                   console.log(`THE RESULTS: ${dbResults}`);

                   // userSocket.emit emits only to the sender
                   socketio.sockets.emit("receive_message",dbResults);
                   console.log(" \nAfter Emitting ... ");
                 }

               });

             });
         });


// Route to use when the requested route is not found on server
app.get('*', function(req, res){
  res.status(404).send(' Resource Not Found ');
});

const myhost = process.env.HOST || 'localhost'
// connect With HTTP and listen On Port 3000 or Available PORT
    http.listen(
      process.env.PORT || 5000,myhost,()=>{
      console.log("running on port 5000");
    })
