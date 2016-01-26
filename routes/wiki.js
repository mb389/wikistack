var express = require('express');
var app = express();
var router = express.Router();
var models = require('../models/');

var Page = models.Page;
var User = models.User;

   router.get('/',function(req,res,next) {
      Page.find().then(function(allPages){
         res.render('index',{
            titles: allPages
         })
      })
      //res.redirect('/');
   });

   router.get('/add',function(req,res,next){
      res.render('addpage');
   });

   router.get('/:urlTitle',function(req,res,next){
      Page.findOne({urlTitle: req.params.urlTitle}).then(function(foundPage){
         res.render('wikipage', {
         title: foundPage.title,
         urlTitle: foundPage.urlTitle,
         author: foundPage.author,
         content: foundPage.content
      });
   });
});

   router.post('/', function(req, res, next) {
     var page = new Page({
       title: req.body.title,
       content: req.body.pageContent
     });

     page.save().then(function(savedPage) {
       res.redirect(savedPage.route);
   }, function(err) {
      if (err) console.log(err);
   });
});

module.exports = router;
