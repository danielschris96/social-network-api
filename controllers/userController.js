const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
                .then(() => res.json({ message: 'User and thoughts deleted!' }))
          )
          .catch((err) => res.status(500).json({ message: 'An error occurred', error: err }));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
      const { userId, friendId } = req.params;
      User.findByIdAndUpdate(
          userId,
          { $addToSet: { friends: friendId } },
          { new: true, runValidators: true }
      )
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
          }
          return User.findByIdAndUpdate(
              friendId,
              { $addToSet: { friends: userId } },
              { new: true, runValidators: true }
          );
      })
      .then(dbFriendData => {
          if (!dbFriendData) {
              res.status(404).json({ message: 'No friend found with this id!' });
              return;
          }
          res.json({ message: 'Friend added successfully' });
      })
      .catch(err => res.status(500).json({ message: 'An error occurred', error: err }));
  },
  removeFriend(req, res) {
      const { userId, friendId } = req.params;
      User.findByIdAndUpdate(
          userId,
          { $pull: { friends: friendId } },
          { new: true }
      )
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
          }
          return User.findByIdAndUpdate(
              friendId,
              { $pull: { friends: userId } },
              { new: true }
          );
      })
      .then(dbFriendData => {
          if (!dbFriendData) {
              res.status(404).json({ message: 'No friend found with this id!' });
              return;
          }
          res.json({ message: 'Friend removed successfully' });
      })
      .catch(err => res.status(500).json({ message: 'An error occurred', error: err }));
  },
}