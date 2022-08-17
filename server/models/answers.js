// Answer Document Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  ans_by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  ans_date_time: {
    type: Date,
    default: Date.now()
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }],
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'votes'
  }],
});

answerSchema.virtual('url').get(function () {
  return 'posts/answer/' + _id;
});

module.exports = mongoose.model('answers', answerSchema);