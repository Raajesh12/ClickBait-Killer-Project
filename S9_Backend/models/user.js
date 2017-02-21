var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our user schema
var UserSchema   = new Schema({
  //userhistory: [{input: String, type: Date}],
  urlhistory: { type : Array , "default" : [] },
  //datehistory: [Date]
  name: String,
  //date: { type: Date, default: Date.now }, // found on internet
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);