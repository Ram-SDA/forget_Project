var express=require("express");
var bodyParser=require('body-parser');
var app = express();
var http = require("http");
var FormData = require('form-data');
var bcrypt = require('bcrypt');
var multer = require("multer");
var date = require('date-and-time');
var fs = require('file-system');
var git = require('git-state')
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
  });
  
  app.use(bodyParser.urlencoded()); 
app.use(bodyParser.json());

var kycRegisterController=require('./controllers/kycRegister-controller');
var authenticateController=require('./controllers/authenticate-controller');
var getdocumentController=require('./controllers/document-controller');
var bankauthenticateController=require('./controllers/bankauthenticate-controller');
var requestbankController=require('./controllers/requestbank-controller');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* route to handle all page */
app.post('/api/register',kycRegisterController.register);
 app.post('/api/authenticate',authenticateController.authenticate); 
 app.post('/api/forget',authenticateController.forget);
 app.post('/api/restpwd',authenticateController.restpwd);
 app.post('/api/bankauthenticate',bankauthenticateController.bankauthenticate); 
 app.post('/api/document',getdocumentController.document);
 app.post('/api/approve',getdocumentController.approve);
 app.post('/api/reject',getdocumentController.reject);
 app.post('/api/requestbank',requestbankController.requestbank);
 app.post('/api/request',requestbankController.request);
 app.post('/api/requestchk',requestbankController.requestchk);

app.listen(6012);

