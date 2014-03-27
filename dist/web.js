var express = require('express');
var http = require('http');
var app = express();
app.use(express.logger());
var server = http.createServer(app);
server.listen(process.env.PORT || 5000);
