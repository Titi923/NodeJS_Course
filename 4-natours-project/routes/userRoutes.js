const express = require('express');
const userController = require('./../controllers/userController')

const router = express.Router();

// Users
router.route('/').get(userController.getAllUsers).post(userController.createUsers);
router.route('/:id').get(userController.getuser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
