const { User, Thought, Reaction } = require('../models');
const mongoose = require('mongoose');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'Thought created, but found no user with that ID' })
              : res.json('Created the thought')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.thoughtId)
          .then((deletedThought) => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            // update the user document
            return User.findOneAndUpdate(
              { thoughts: req.params.thoughtId }, // find user with this thought
              { $pull: { thoughts: req.params.thoughtId } }, // remove thought from user's thoughts array
              { new: true }
            );
          })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user found with this thought!' });
            }
            res.json({ message: 'Thought successfully deleted!' });
          })
          .catch((err) => res.status(400).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId, "reactions._id": mongoose.Types.ObjectId(req.params.reactionId) },
          { $pull: { reactions: { _id: mongoose.Types.ObjectId(req.params.reactionId) } } },
          { new: true }
      )
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              console.log("Failed to remove reaction. No thought found with this id.");
              return res.status(404).json({ message: 'No thought found with this id!' });
          }
          console.log("Reaction removal was successful.");
          return res.json(dbThoughtData);
      })
      .catch(err => {
          console.log("Error occurred while removing reaction: ", err);
          return res.status(500).json(err);
      });
  }
}