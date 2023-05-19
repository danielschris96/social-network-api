const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid e-mail address']
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true
      }
});


const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

User.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        User.insertMany(
            [
                {
                  "username": "johnDoe",
                  "email": "johnDoe@example.com"
                },
                {
                  "username": "janeDoe",
                  "email": "janeDoe@example.com"
                },
                {
                  "username": "jimmyDoe",
                  "email": "jimmyDoe@example.com"
                },
                {
                  "username": "jennyDoe",
                  "email": "jennyDoe@example.com"
                }
              ]
        )
    }
});

module.exports = User;