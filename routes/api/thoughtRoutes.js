const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController.js');
const reactionController = require('../../controllers/reactionController.js');

// GET all thoughts
router.get('/', thoughtController.getAllThoughts);

// GET thought by its id
router.get('/:id', thoughtController.getThoughtById);

// POST new thought
router.post('/', thoughtController.createThought);

// PUT thought by its id
router.put('/:id', thoughtController.updateThought);

// DELETE thought by its id
router.delete('/:id', thoughtController.deleteThought);

// POST reaction to thought's reaction list
router.post('/:thoughtId/reactions', reactionController.createReaction);

// DELETE reaction from a thought's reaction list
router.delete('/:thoughtId/reactions/:reactionId', reactionController.removeReaction);

module.exports = router;