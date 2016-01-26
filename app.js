var express = require('express');
var fs=require('fs');
app=express();
var path = require("path");
var swig = require('swig');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var wikiRouter = require('./routes/wiki');

var server = app.listen(1337,  function(req, res, next){
  console.log("Server listening");
});

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});


app.use(express.static(path.join(__dirname, '/public')));
//app.use(morgan('dev'));
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// logging middleware

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
app.use('/wiki', wikiRouter);
