const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const internshipController = require('../../controllers/internshipController');

router.post('/', auth, internshipController.postInternship);

module.exports = router;
