const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const userController = require('../../controllers/userController');

// router.post('/', userController.registerUser);
router.get('/', userController.getProfile);

module.exports = router;
