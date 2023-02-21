const express = require('express');
const {mailController} = require('../../controllers/');

const router = express.Router();

router.route('/').post(mailController.mail);
router.route('/contactUs').post(mailController.contactUs);

module.exports = router;
