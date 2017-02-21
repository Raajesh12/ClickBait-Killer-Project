var mongoose = require('mongoose');

// Define our history schema
var HistorySchema   = new mongoose.Schema({
  sourcedata: String,
  date: { type: Date, default: Date.now }, // found on internet
  //sentiments: [[String], [Schema.Types.ObjectId], [Schema.Types.ObjectId]]  
});

// Export the Mongoose model
module.exports = mongoose.model('History', HistorySchema);