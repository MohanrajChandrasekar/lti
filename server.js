"use strict";
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/environment');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require("fs");
var runner = require("child_process");
var uniqid = require('uniqid');
var phpScriptPath = "./script.php";
const lti = './lti_consumer.php';
// var argsString = "value1,value2,value3";
// const launchModel = require('./models/launch.model').model;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use('/', router);

router.get('/get', function (req, res) {
   res.send('Get up...');
});

router.post('/launch', function (req, res) {
   try {
      const object = Object.assign({}, req.body);
      console.log(object);
      // const launchURL = 'http://udapqa.southindia.cloudapp.azure.com/udapdev/ltiDeliveryProvider/DeliveryTool/launch/eyJkZWxpdmVyeSI6Imh0dHA6XC9cL3VkYXBxYS5zb3V0aGluZGlhLmNsb3VkYXBwLmF6dXJlLmNvbVwvdWRhcGRldlwvdWRhcC5yZGYjaTE1OTQyMzE4ODAyMTgxNjQifQ==';
      // const secret = 'LTIConsumer123456789';
      // const sharedSecret = 'LTIConsumer123456789s';

      var argsString = object.launchURL + ',' + object.secret + ',' + object.sharedSecret + ',' + object.user_id + ',' + object.role + ',' + object.context_id + ',' + object.context_title + ',' + object.context_label + ',' + object.lis_person_name_given + ',' + object.lis_person_name_full + ',' + object.lis_person_contact_email_primary;
       runner.exec("php " + lti + ' ' + argsString, function (err, phpResponse, stderr) {
         if (err) {
            console.log(err); /* log error */
            processResponse(false, 500, 'Error While Fetching Data!', err, res);
         } else {
            res.send(phpResponse);
         }
      });
   } catch (err) {
      console.log(err);
      processResponse(false, 500, 'Error While Fetching Data!', err, res);
   }
});

router.get('/launch/lti/data', async(req, res) => {
   try {
      console.log(req.params);
      console.log(res);
      const params = {
         data: req.params + ' & ' + res
      };
      // const launch = new launchModel(params);
      // const result = await launch.save();
   } catch(err) {
      console.log(err);
   }
});

async function processResponse(statusBool, statusHttp, msg, result, response) {
   response.send({
      statusBool: statusBool,
      statusHttp: statusHttp,
      message: msg,
      data: result
   });
}

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port)
});


// runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
//  if(err) console.log(err); /* log error */
// console.log( phpResponse );
// });

