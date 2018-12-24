var connection = require('./../config');
var bcrypt = require('bcrypt');
var date = require('date-and-time');

module.exports.register = function (req, res) {    
    //Synchronous hash Password
    //var hash = bcrypt.hashSync(req.body.password, 10);
    debugger;
    var password="dx@123";
    var salt = bcrypt.genSaltSync(10);
    var pwdhash = bcrypt.hashSync(password, salt);
    var name= req.body.username;
    var email= req.body.email;
    var aathas= req.body.aathar;
    var bankname= req.body.bankname;
    //req.body.dateofbirth
    var dob;
    (function() {
        debugger;
        var dat = new Date(req.body.dateofbirth);
        
            debugger;
            var year, month, day;
            year = String(dat.getFullYear());
            month = String(dat.getMonth() + 1);
            if (month.length == 1) {
                month = "0" + month;
            }
            day = String(dat.getDate());
            if (day.length == 1) {
                day = "0" + day;
            }
            var aa= year + "-" + month + "-" + day;
            dob=aa.toString();
    })();    
   
    var pwd= pwdhash;
    let usercredentials= "SELECT * from kycusers WHERE Email = '"+ email+"' or aadhar='"+aathas +"' ";
    connection.query(usercredentials, function (error, results, fields) {
        if (error) {
            res.json({
              status:false,
              message:'there are some error with query'
              })        
          }else{
            
          if(results.length >0){
            res.json({
                status: false,
                message: 'Email Already Exist'
            })             
          }
          else{
              debugger;
    connection.query("CALL registerUser('"+name+"','"+email+"','"+pwd+"','"+dob+"','"+aathas+"','"+bankname+"'); SELECT LAST_INSERT_ID();", function (error, results, fields) {
       debugger;
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                dat: results[1][0],
                message: 'user saved sucessfully'
            });
        }
    });
}
}
});
}





