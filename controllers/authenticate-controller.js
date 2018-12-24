var connection = require('./../config');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var randtoken = require('rand-token');
var bcrypt = require('bcrypt');
module.exports.authenticate=function(req,res){
    debugger;
    var email=req.body.email;
    var password=req.body.password;

    let usercredentials= `CALL getUsers(?)`  // Call Procedure

    connection.query(usercredentials,[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })      
        }else{
            debugger;
        if(results[0].length >0){
           var pass= JSON.stringify(results);
            // Asynchronous Password  by RAM_21-03-2018
            var chkpwd=results[0][0].Pass;
            bcrypt.compare(password, chkpwd, function(err, ress) {
            if(!ress){
                debugger;
                res.json({
                    status:false,
                    message:"Email and password does not match"
                   });                
            }else{
                res.json({
                    status:true,
                    message:'successfully authenticated',
                    uname:results[0][0].Name
                });
            }
        });
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}



module.exports.forget=function(req,res){
    debugger;
    var email=req.body.email;
    var salt = bcrypt.genSaltSync(10);
    var emailhash = bcrypt.hashSync(req.body.email, salt);
    var token = randtoken.generate(16);
    var str=" ";
    str=str+"<p> You have requested a password reset, please follow the link below to reset your password.</p>";
    str=str+"<p> Please ignore this email if you did not request a password change.</p> ";
    str=str+" <p><a href='http://35.200.198.199/fbank/#/forgetpwd?auth="+token+"&m="+email+"'>Follow this link to reset your password.!</a> </p>";
        

   // let usercredentials= `CALL getUsers(?)`  // Call Procedure
  
   
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'username', //abc@gmail.com
          pass: 'password'  //password
        },
       
      });
      
      var mailOptions = {
        from: 'username',   //abc@gmail.com
        to: email,
        subject: 'Forget Password',
        text: 'That was easy!',
        html:    str  
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      connection.query("select * from kycusers where Email='"+email+"' ", function (error, results, fields) {
        if (error) {
            res.json({
              status:false,
              message:'there are some error with query'
              })      
          }else{
            if(results.length >0){
      connection.query("UPDATE kycusers SET Token = '"+token+"' WHERE Email ='"+ email +"' ", function (error, results, fields) {
          debugger;
        if (error) {
            res.json({
              status:false,
              message:'there are some error with query'
              })      
          }else{
            res.json({
                status:true,
                message:'successfully'
            });
          }
        });
    }
    else{
        res.json({
            status:false,    
          message:"case1"
        });
    }
}

});

}

module.exports.restpwd=function(req,res){
    debugger;
    var email=req.body.email;
    var token = req.body.token;
    var pass = req.body.pwd;
   
   
    //let usercredentials= 'select * from kycusers where Email='"+email+"'`  // Call Procedure

    connection.query("select * from bankusers where Token='"+token+"' ", function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })      
        }else{
            debugger;
        if(results.length >0){
          // var pass= JSON.stringify(results);
            // Asynchronous Password  by RAM_21-03-2018
            var chkpwd=results[0].Email;
           // bcrypt.compare(email, chkpwd, function(err, ress) {
                debugger;
                if(chkpwd!=email){
                    debugger;
                    res.json({
                        status:false,
                        message:"case2"
                       });                
                }else{
                    var salt = bcrypt.genSaltSync(10);
                    var pwdhash = bcrypt.hashSync(pass, salt);
                    connection.query("UPDATE bankusers SET Pass = '"+pwdhash+"' WHERE Email ='"+ results[0].Email +"' ", function (error, results, fields) {
                        debugger;
                      if (error) {
                          res.json({
                            status:false,
                            message:'there are some error with query'
                            })      
                        }else{
                          res.json({
                              status:true,
                              message:'successfully'
                          });
                        }
                      });
                }
            //});
        }
        else{
          res.json({
              status:false,    
            message:"case1"
          });
        }
      }
    });

}

