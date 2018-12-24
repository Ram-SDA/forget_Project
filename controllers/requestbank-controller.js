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

module.exports.requestbank = function (req, res) {
    debugger;

    var uname = req.body.userID;
    let usercredentials = `CALL getRequestDocuments(?)`  // Call Procedure

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
                //filePath = 'D:/KYC/Jun-6/uploads/' + results[0][0].licensefileName;


               // var obj = fs.readFileSync(filePath, 'base64');
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


module.exports.request = function (req, res) {
    debugger;
    var userid = req.body.userid;
    var bank = req.body.bank;
    var docid = req.body.docid;
    let usercred = " select * from kycusersrequest where userId='" + userid + "' and RequestBanks='" + bank + "' and flag='true' ";
    connection.query(usercred, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            debugger;
            if (results.length == 0) {
                let usercredentials = " insert into kycusersrequest (userId,RequestBanks,TypeId,docuId,flag) values ('" + userid + "','" + bank + "','1','" + docid + "', 'true')";
                connection.query(usercredentials, function (error, results, fields) {
                    if (error) {
                        res.json({
                            status: false,
                            message: 'there are some error with query'
                        })
                    } else {
                        debugger;
                        res.json({
                            status: true,
                            message: 'success',
                            dat:userid
                        })
                    }
                });
            }
            else {
                debugger;
                res.json({
                    status: true,
                    message: 'already'
                })
            }
        }
    });

}



module.exports.requestchk = function (req, res) {
    debugger;
    var userid = req.body.userid;
    var bank = req.body.bank;
    let usercred = " select * from kycusersrequest where userId='" + userid + "' and RequestBanks='" + bank + "' and flag='true'  and TypeId='1'";
    connection.query(usercred, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            debugger;
            if (results.length == 0) {
                res.json({
                    status: true,
                    message: 'success',
                    dat:results
                })
            }
            else {
                debugger;
                res.json({
                    status: true,
                    message: 'already'
                })
            }
        }
    });

}
