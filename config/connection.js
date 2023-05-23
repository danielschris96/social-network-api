const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// export connection
module.exports = mongoose.connection;