// Vote Document Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
  type: String,
  vote_by: { type: Schema.Types.ObjectId, ref: 'users' }
});

module.exports = mongoose.model('votes', voteSchema);