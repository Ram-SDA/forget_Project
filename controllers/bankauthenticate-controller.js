var connection = require('./../config');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

module.exports.bankauthenticate=function(req,res){
    debugger;
    var email=req.body.email;
    var password=req.body.password;

    let usercredentials= `CALL getbankUsers(?)`  // Call Procedure

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


