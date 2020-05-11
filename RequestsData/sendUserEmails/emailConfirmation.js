var nodemailer = require('nodemailer');

//const mysqlConnection = require("../../MysqlConnection/connections");


//recoveryRouter.get("/passwordRecovery",(req,res,err)=>{





  // // Send Email To One Address
  // var mailOptions = {
  //   from: 'cscodelab@gmail.com',
  //   to: 'norbertaberor@gmail.com',
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // };


  //Send email to more than one address:

//   var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   }
//
//

  // mysqlConnection.query(`SELECT * FROM Articles ORDER BY arttime Desc LIMIT 500`,
  //     (err,rows,cols)=>{
  //        if(!err){
  //          res.json(rows);
  //          //res.json("Registration Failed");
  //        }
  //
  // });
//});

//http://localhost:3000/PasswordVerification?uemail%3Dnorbertaberor@gmail.com%26queryString%3D69941035268568160&source=gmail&ust=1586945357520000&usg=AFQjCNH9eoAZ-zQGGxte9kQAbAk_LpwEqA

var verifyMail = function(verificationUrl,userEmail,theusername){
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    //service: 'gmail',
    auth: {
      user: 'cscodelab@gmail.com',
      pass: "dzlwvgphobqjaxni"//'116noblekross'//dzlwvgphobqjaxni-google-app-sign-in-email
    },
    secureConnection: 'false',
    tls: {
        rejectUnauthorized: false
    }
  });



  // Send email containing HTML:
    var mailOptions = {
      from: 'cscodelab@gmail.com',
      to: userEmail,//'norbertaberor@gmail.com',
      subject: 'Email verification - Verify Your Email',
      html: `<!DOCTYPE html>
      <html >
        <head>
          <meta charset="UTF-8">
          <title>Complete Registration</title>

        </head>

        <body>

          <!DOCTYPE html>
      <html>

        <head>
          <style type="text/css">
            body{
            			text-align:center;
            			background-color:#F5F6F7;
            			font-family:sans-serif;
            		}
            		#container{
            			padding-top:30px;
            			padding-bottom:30px;
            			background-color:#FFF;
            			width:500px;
            			margin:0 auto;
            		}
            		#lonelyheart{
            			display:block;
            			margin:0 auto 10px auto;
            			width:50px;
            		}
            		#thanks{
            			width:500px;
            			margin-bottom:-10px;
            		}
            		.red{
            			color:#0F0E61;
            		}
            		.button{
            			text-transform:uppercase;
            			background-color:#0F0E61;
            			width:300px;
            			margin:0 auto;
            			border-radius:2px;
            			color:#FFF;
            			padding:20px;
            		}
            		#verify{
            			display:block;
            			margin-top:20px;
            			text-decoration:none;
            			font-weight:bold;
            		}
            		#shop{
            			text-decoration:none;
            		}
            		hr{
            			width:350px;
            			margin:30px auto;
            		}
            		.expectation{
            			margin-top:30px;
            		}
            		.expectation img{
            			width:50px;
            			float:left;
            			margin-left:100px;
            		}
            		.expectation .description{
            			margin-left:180px;
            			text-align:left;
            		}
            		.expectation h4{
            			text-align:left;
            			display:inline;
            		}
            		#footer{
            			padding:20px 0 10px 0;
            			background-color:#0F0E61;
            			width:500px;
            			margin:0 auto 20px auto;
            			color:#FFF;
            			text-align:center;
            		}
            		#app{
            			width:50px;
            			margin-bottom:15px;
            		}
            		.get{
            			margin:15px 0px;
            		}
            		.social{
            			margin-bottom:20px;
            		}
            		.social a{
            			margin:0 10px;
            		}
            		.address{
            			font-size:12px;
            			color:#666;
            		}
            		.address div{
            			margin-bottom:3px;
            		}
            		h4{
            			font-size:1.35em;
            			font-weight:500;
            			letter-spacing:.5px;
            		}
            		.getps{
            			font-size:.85em;
            			margin:0;
            			padding:0;
            			font-weight:300;
            		}
            		.tagline{
            			font-size:.85em;
            			font-weight:100;
            			margin:4px 0;
            			padding:0;
            		}
            		.cta-link{
            			font-size:.85em;
            			color:#f15a5f;
            			font-weight:100;
            		}
          </style>
        </head>

        <body style="text-align: center;background-color: #F5F6F7;font-family: sans-serif; padding: 20px 0">
          <!-- <img id="lonelyheart" src="https://s3.amazonaws.com/socialps-assets/join/lonelyheart.png?a=2"
          style="display: block;margin: 0 auto 20px auto;width: 48px; margin-top:40px; padding-top: 25px"> -->
          <!-- <img id="thanks" src="https://s3.amazonaws.com/socialps-assets/join/ThanksForJoiningimage.jpg?a=2"
          style="width: 500px;margin-bottom: -10px;"> -->

          <img id="thanks" src="https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/hicodeish.png?raw=true"
          style="width: 500px;margin-bottom: -10px;">

          <div id="container" style="padding-top: 60px;padding-bottom: 30px;background-color: #FFF;width: 500px;margin: 0 auto;">
          <br>
            <center><b> <i>Hi</i> ${theusername} <i>!</i> </b></center><br>

            <strong class="red" style="color: #0F0E61;">


            <table class="g-heading" cellpadding="0" cellspacing="0" style="border:0; border-collapse:collapse; border-spacing:0; font-family:Helvetica, Arial, sans-serif; mso-table-bspace:0; mso-table-lspace:0; mso-table-rspace:0; mso-table-tspace:0; width:100%!important"
              width="100%">
              <tbody>
                <tr style="font-family:Helvetica, Arial, sans-serif">
                  <td style="color:#1f1f1f; font-family:Helvetica, Arial, sans-serif; font-size:30px; font-weight:600; line-height:30px; mso-line-height-rule:exactly; padding-bottom:20px; text-align:center; vertical-align:top" align="center"
                    valign="top">Thanks for joining!</td>
                </tr>
              </tbody>
            </table>

            <!-- <table class="g-paragraphs" cellpadding="0" cellspacing="0" style="border:0; border-collapse:collapse; border-spacing:0; font-family:Helvetica, Arial, sans-serif; mso-table-bspace:0; mso-table-lspace:0; mso-table-rspace:0; mso-table-tspace:0; width:100%!important"
              width="100%">
              <tbody>
                <tr style="font-family:Helvetica, Arial, sans-serif">
                  <td style="color:#494949; font-family:Helvetica, Arial, sans-serif; font-size:19px; line-height:32.3px; mso-line-height-rule:exactly; padding-bottom:15px; text-align:center; vertical-align:top" align="center" valign="top">Please confirm your email address to activate your account and start tracking your favorite performers and events.
                  </td>
                </tr>
              </tbody>
            </table>       -->
                      <!-- Please verify your email for us. -->
                  </strong>
                  <br>

                  <h4>Please confirm your email address to activate your account to be able to retrieve your password when forgotten. Enjoy the awesome activities in our Community, your favorite articles, Courses, and other events.</h4>

                  <br>

            <a id="verify" href="${verificationUrl}"
            style="display: block;margin-top: 20px;text-decoration: none;font-weight: bold;">
              <div class="button" style="text-transform: uppercase;background-color: #0F0E61;width: 300px;margin: 0 auto;border-radius: 2px;color: #FFF;padding: 26px; font-size:smaller; letter-spacing:.5px;">Confirm Your Email Address</div>
            </a>
            <hr style="width: 350px;margin: 60px auto; height: 0;
          border: 0;border-top: 1px solid #eee;">
             <h3 style="font-size:1.5em; color:#6d6d6d; margin: 2em 0;">
                      Here's what to expect:
                  </h3>
                  <h4><p>Codeish is the smart way for developers to learn and engage themselves in developer communities and activities, we meet you where you are and get you where you want to go. Let us show you how it works.</p></h4>



            <hr style="width: 350px;margin: 60px auto; height: 0;
          border: 0;border-top: 1px solid #eee;">
            <a id="shop" href="http://www.codeish.live" style="text-decoration: none; font-weight:bold;">
              <div class="button" style="text-transform: uppercase;background-color: #0F0E61;width: 300px;margin: 0 auto;border-radius: 2px;color: #FFF;padding: 26px; font-size:smaller; letter-spacing:.5px;">Get Started</div>
            </a>
            <img id="app" src="https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/tranparent%20Image.png?raw=true"
            style="width: 62px;margin-bottom: 15px;">
          </div>

          <div id="footer" style="padding: 30px 0 15px 0;background-color: #0F0E61;width: 500px;margin: 0 auto 30px auto;color: #FFF;text-align: center;">
            <img id="app" src="https://github.com/norbertkross/FlutterWeb/blob/master/hosted%20Images/tranparent%20Image.png?raw=true"
            style="width: 62px;margin-bottom: 15px;">
            <!-- <img id="app" src="https://s3.amazonaws.com/socialps-assets/join/appImage.png?a=2"
            style="width: 62px;margin-bottom: 15px;"> -->
            <div>
              <p class="getps" style="font-size: .85em;margin: 0;padding: 0;font-weight: 300;">CODEISH is available for iOS and Android</p>
            </div>
            <div>
              <a href="https://itunes.apple.com/us/app/print-studio/id601882801">
                <img class="get" src="https://s3.amazonaws.com/socialps-assets/join/appStore.png?a=2"
                style="max-height:36px;margin: 15px 1px;">
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.socialprintstudio.printstudio">
                <img class="get" src="https://s3.amazonaws.com/socialps-assets/join/play.png?a=2"
                style="max-height:36px; margin: 15px 1px;">
              </a>
            </div>
          </div>
          <div class="social" style="margin-bottom: 20px;">

            <a href="https://www.instagram.com/socialps/" style="margin: 0 10px;text-decoration:none;">
              <img src="https://s3.amazonaws.com/socialps-assets/join/ig.png?a=2" style="max-height: 25px;">
            </a>


            <a href="https://www.facebook.com/aberor norbert" style="margin: 0 10px;text-decoration:none;">
              <img src="https://s3.amazonaws.com/socialps-assets/join/fb.png?a=2" style="max-height: 25px;">
            </a>



            <a href="https://twitter.com/socialps" style="margin: 0 10px;text-decoration:none;">
              <img src="https://s3.amazonaws.com/socialps-assets/join/twitter.png?a=2" style="max-height: 25px;">
            </a>



            <a href="https://www.youtube.com/user/SocialPs" style="margin: 0 10px;">
              <img src="https://s3.amazonaws.com/socialps-assets/join/youtube.png?a=2" style="max-height: 25px;">
            </a>
          </div>
          <div class="address" style="font-size: 13px;color: #666; margin-top:30px; font-weight: 100;">
            <table cellpadding="0" cellspacing="0" align="center" style="color:#a6a6a6; font-family:Helvetica, Arial, sans-serif; font-size:13px; line-height:13px; margin:0 auto; mso-line-height-rule:exactly">
              <tbody>
                <tr style="color:#a6a6a6; font-family:Helvetica, Arial, sans-serif; font-size:13px; line-height:13px; mso-line-height-rule:exactly">
                  <td style="border-right:1px solid #a6a6a6; color:#a6a6a6; font-family:Helvetica, Arial, sans-serif; font-size:13px; line-height:13px; mso-line-height-rule:exactly; padding:0 10px 1px 10px; white-space:nowrap">© 2020 Codeish .</td>
                  <td style="color:#a6a6a6; font-family:Helvetica, Arial, sans-serif; font-size:13px; line-height:13px; mso-line-height-rule:exactly; padding:0 10px 1px 10px; white-space:nowrap"><a href="http://www.codeish.live"
                      style="color:#a6a6a6; font-family:Helvetica, Arial, sans-serif; font-size:13px; line-height:13px; mso-line-height-rule:exactly; text-decoration:underline" target="_blank">Codeish</a></td>
                  <td style="border-left:1px solid #a6a6a6; color:#a6a6a6; font-family:Helvetica, Arial, sans-serif; font-size:13px; line-height:13px; mso-line-height-rule:exactly; padding:0 10px 1px 10px; white-space:nowrap"><a href="http://www.codeish.live/#/about-codeish"
                      style="color:#a6a6a6; font-family:Helvetica, Arial, sans-serif; font-size:13px; line-height:13px; mso-line-height-rule:exactly; text-decoration:underline" target="_blank">About</a></td>
                </tr>
              </tbody>
            </table>
            <br>
            <!-- <div style="margin-bottom: 4px;">Codeish</div>
            <div style="margin-bottom: 4px;">Software Technologies</div>
            <div style="margin-bottom: 4px;">Accra - Ghana</div> -->
            <div style="margin-bottom: 20px;">
            </div>
          </div>

        </body>

      </html>





        </body>
      </html>
  `
    }



    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(`THE ERR: ${error}`);
        //res.send("Bad State");
      } else {
        //res.send("OKAY")
        console.log('Email sent: ' + info.response);
      }
    });

}

module.exports = verifyMail
