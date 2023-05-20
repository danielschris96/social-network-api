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
      username: {
        type: String,
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


const Thought = mongoose.model('Thought', thoughtSchema);

Thought.find({}).exec((err, collection) => {
    if (err) {
        console.error("Error fetching thoughts:", err);
    } else if (collection.length === 0) {
        Thought.insertMany([
            {
              "thoughtText": "I love coding in JavaScript!",
              "username": "johnDoe"
            },
            {
              "thoughtText": "Mongodb is really flexible, it's great for our project.",
              "username": "janeDoe"
            },
            {
              "thoughtText": "Express.js makes server setup a breeze!",
              "username": "jimmyDoe"
            },
            {
              "thoughtText": "I'm getting the hang of full stack development!",
              "username": "jennyDoe"
            }
          ], (err) => {
            if (err) {
                console.error("Error inserting thoughts:", err);
            }
        });
    }
});

module.exports = Thought;