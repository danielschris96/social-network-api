const express = require('express');
const db = require('./config/connection');
// Require model
const { User, Thought, Reaction } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Network API!');
});



db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });