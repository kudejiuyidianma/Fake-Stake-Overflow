// Question Document Schema
var mongoose = require('mongoose');
const tags = require('./tags');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  text: {
    type: String,
    required: true
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tags',
      required: true
    }
  ],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'answers'
  }],
  asked_by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  ask_date_time: {
    type: Date,
    default: new Date(),
  },
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }],
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'votes'
  }],
}, { timestamps: true });

questionSchema.virtual('url').get(function () {
  return 'posts/question/' + _id;
});

module.exports = mongoose.model('questions', questionSchema);