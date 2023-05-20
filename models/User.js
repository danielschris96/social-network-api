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
}, {
    toJSON: {
        virtuals: true
    }
});


const User = mongoose.model('User', userSchema);

User.find({}).exec((err, collection) => {
    if (err) {
        console.error("Error fetching users:", err);
    } else if (collection.length === 0) {
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