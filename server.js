var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var fs = require("fs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/listTreeData', function (req, res) {    
   fs.readFile("treeData.json", 'utf8', function (err, data) {
       console.log('Success');
       res.end(data);
   });
})

app.post('/addTreeData', function (req, res) {
    console.log('Request.body '+req.body)
    fs.writeFile("treeData.json",JSON.stringify(req.body))
    res.end(JSON.stringify(req.body))
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

