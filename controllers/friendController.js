const { User } = require('../models');

module.exports = {
  addFriend: async (req, res) => {
    const { userId, friendId } = req.params;

    try {
      if (!userId || !friendId) {
        return res.status(400).json({ error: 'Both userId and friendId are required.' });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removeFriend: async (req, res) => {
    const { userId, friendId } = req.params;

    try {
      if (!userId || !friendId) {
        return res.status(400).json({ error: 'Both userId and friendId are required.' });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
