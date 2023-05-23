const mongoose = require('mongoose');
const { Schema } = mongoose;
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // use moment to format the timestamp on query
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
      userId: {
        // use mongoose's ObjectId data type and ref property to tell the Thought model which documents to search to find the right thoughts
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      // use reactionSchema to validate data for a reply
      reactions: [reactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      }
    });

    // get total count of comments and replies on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});




const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;