var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var recentSchema = new Schema({
  search:String,
  time: String
});


var obj = {
  recent: mongoose.model('image', recentSchema),
  addRecent: addRecent,
  getRecent: getRecent
};



function getRecent(cb) {
  obj.recent.find({}).sort('-date').limit(10).exec(cb);
}

function addRecent(query) {

  var recent = new obj.recent({
    search: query.search,
    time: query.time
  });
  
  recent.save();
}



//mongo
mongoose.connect(process.env.MongoUrl);

module.exports = obj;