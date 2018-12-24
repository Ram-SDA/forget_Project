var connection = require('./../config');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var express = require('express');
var app = express();
var multer = require("multer");
var http = require('http');
var fs = require('fs');
//Canvas  = require('canvas');
var git = require('git-state')
var request = require('request')
//path = require('path'),
module.exports.document = function (req, res) {
    debugger;
    var uname=req.body.userID;
    let usercredentials = `CALL getDocuments(?)`  // Call Procedure

    connection.query(usercredentials, [uname], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            debugger;

            if (results[0].length != 0) {
                var pat = 'http://127.0.0.1:8887/';

                // filePath = path.join('file:///D:/KYCUsers/Jun_4/uploads/', results[0][0].licensefileName);
               // filePath = 'D:/KYC/Jun-6/uploads/' + results[0][0].licensefileName;


                //var obj = fs.readFileSync(filePath, 'base64');
                // var b = new Buffer(results[0][0].licensefileName, 'base64');
                for (var i = 0; i < results[0].length; i++) {
                    if (i == 0) {
                        results[0][i].licensefileName = results[0][i].licensepath;
                        results[0][i].passportfileName = results[0][i].passportpath;
                        results[0][i].utiliybillfileName = results[0][i].utiliybillpath;
                        results[0][i].aadhaarfileName = results[0][i].aadhaarpath;
                    }
                    if (i == 1) {
                        // results[0][i].licensefileName = pat + results[0][i].licensefileName;
                        // results[0][i].passportfileName = pat + results[0][i].licensefileName;
                        // results[0][i].utiliybillfileName = pat + results[0][i].licensefileName;
                    }
                    if (i == 2) {
                        // results[0][i].licensefileName = pat + results[0][i].licensefileName;
                        // results[0][i].passportfileName = pat + results[0][i].licensefileName;
                        // results[0][i].utiliybillfileName = pat + results[0][i].licensefileName;
                    }
                }
            }
            //var template_path = 'file:///D:/KYCUsers/Jun_4/uploads/'+results[0][0].licensefileName +''  ;
            debugger;
            res.json({
                status: false,
                dat: results[0]
            })
        }
    });

}




module.exports.approve = function (req, res) {
    debugger;
    var docid = req.body.docID;
    var useid = req.body.useID;
    var bankid = req.body.bankID;
    let usercredentials = " UPDATE documentdetails SET status = 'Approved' WHERE documId =" + docid + "";
    connection.query(usercredentials, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            debugger;
            let docDetails = "select name,aadhar, dob, Email from kycusers where Id = "+ useid;
            connection.query(docDetails, function(error, results, fields){
                    if(error){
                        console.log(error);
                    }else{
                        console.log(results,results[0].name, JSON.parse(JSON.stringify(results)))
                        request.post("http://35.200.198.199:3000/api/invokeNetwork",{body:{name:results[0].name,dob:results[0].dob,email:results[0].Email,adhar:results[0].aadhar},json:true},
                        function(error,response,body){
                            if(error){
                                console.log(error)    
                            }else{
                                console.log(body);
                            }

                        })
                    }
            })
            let usecredentials = " insert into kycusersrequest (userId,RequestBanks,Description,TypeId,flag) values ('" + useid + "','" + bankid + "','approved your document','2', 'true')";
                connection.query(usecredentials, function (error, results, fields) {
                    if (error) {
                        res.json({
                            status: false,
                            message: 'there are some error with query'
                        })
                    } else {
                        debugger;
                        res.json({
                            status: true,
                            message: 'success'
                        })
                    }
                });
        }
    });
}


module.exports.reject = function (req, res) {
    debugger;
    var docid = req.body.docID;
    var useid = req.body.useID;
    var bankid = req.body.bankID;
    let usercredentials = "delete from documentdetails WHERE documId =" + docid + "";
    connection.query(usercredentials, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            debugger;
            let usecredentials = " insert into kycusersrequest (userId,RequestBanks,Description,TypeId,flag) values ('" + useid + "','" + bankid + "','reject your document','3', 'true')";
                connection.query(usecredentials, function (error, results, fields) {
                    if (error) {
                        res.json({
                            status: false,
                            message: 'there are some error with query'
                        })
                    } else {
                        debugger;
                        res.json({
                            status: true,
                            message: 'success'
                        })
                    }
                });
        }
    });
}