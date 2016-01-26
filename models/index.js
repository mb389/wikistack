var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
  title:    {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:  {type: String, required: true},
  status:   {type: String, enum: ['open','closed']},
  date:     {type: Date, default: Date.now},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

pageSchema.pre('validate',function(next){
   var self=this;
   if (self.title)
      self.urlTitle=self.title.replace(/\s+/g,"_").replace(/\W/g,"");
   else
      self.urlTitle=Math.random().toString(36).substring(2,7);
   next();
});

pageSchema.virtual('route').get(function(){
   var self=this;
   return '/wiki/'+self.urlTitle;
});

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};
