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
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      reactions: [reactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      }
    });

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});




const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;