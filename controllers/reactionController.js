const { Thought } = require('../models');

module.exports = {

    createReaction: async (req, res) => {
        const { thoughtId } = req.params;
        const { reactionBody, username } = req.body;

        try {
            if (!thoughtId) {
                return res.status(400).json({ error: 'thoughtId is required.' });
            }

            const newReaction = { reactionBody, username };

            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $push: { reactions: newReaction } },
                { new: true }
            );

            res.json(updatedThought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    removeReaction: async (req, res) => {
        const { thoughtId, reactionId } = req.params;

        try {
            if (!thoughtId || !reactionId) {
                return res.status(400).json({ error: 'Both thoughtId and reactionId are required.' });
            }

            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );

            res.json(updatedThought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
