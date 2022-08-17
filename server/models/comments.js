// Comment Document Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  com_by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  com_date_time: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('comments', commentSchema);