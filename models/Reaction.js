const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // use moment to format the timestamp on query
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
},
// use toJSON to tell the schema to use virtuals
{
  toJSON: {
    getters: true
  }
});

module.exports = reactionSchema;