const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const organisationController = require('../../controllers/organisationController');

router.post('/', auth, organisationController.createOrganisation);

module.exports = router;
