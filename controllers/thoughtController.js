const { User, Thought } = require('../models');

module.exports = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.id);
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createThought: async (req, res) => {
        const { thoughtText, username, userId } = req.body;

        try {
            if (!userId) {
                return res.status(400).json({ error: 'userId is required.' });
            }

            const newThought = await Thought.create({ thoughtText, username, userId });

            await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });

            res.json(newThought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateThought: async (req, res) => {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedThought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteThought: async (req, res) => {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id });

            await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.id } });

            res.json(deletedThought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
