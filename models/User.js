const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
        // use regex to validate correct email format
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            // use mongoose's ObjectId data type and ref property to tell the User model which documents to search to find the right thoughts
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
    ],
    friends: [
        {
            // use mongoose's ObjectId data type and ref property to tell the User model which documents to search to find the right friends
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
    ]
}, {
    toJSON: {
        virtuals: true
    }
});

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

//   create the User model using the UserSchema
const User = mongoose.model('User', userSchema);

// export the User model
User.find({}).exec((err, collection) => {
    if (err) {
        console.error("Error fetching users:", err);
    } else if (collection.length === 0) {
        // seed data
        User.insertMany([
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
        ], (err) => {
            if (err) {
                console.error("Error inserting users:", err);
            }
        });
    }
});

module.exports = User;