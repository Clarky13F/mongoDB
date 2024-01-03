const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReactionSchema = require('./ReactionSchema');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const dateFormat = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
};

const Thought = mongoose.model('Thought', thoughtSchema, 'users.thoughts');

module.exports = Thought;