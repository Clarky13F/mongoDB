const router = require('express').Router();;
const userController = require('../../controllers/userController');
const friendController = require('../../controllers/friendController');

// GET all users
router.get('/', userController.getAllUsers);

// GET user by its id with thought and friend data
router.get('/:id', userController.getUserById);

// POST new user
router.post('/', userController.createUser);

// PUT user by its id
router.put('/:id', userController.updateUser);

// DELETE user by its id
router.delete('/:id', userController.deleteUser);

// POST new friend to a user's friend list
router.post('/:userId/friends/:friendId', friendController.addFriend);

// DELETE friend from a user's friend list
router.delete('/:userId/friends/:friendId', friendController.removeFriend);

module.exports = router;