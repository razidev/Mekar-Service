const express = require('express');
const router = express.Router();
const formHandler = require('./handlers/simple-form');

router.post('/form', formHandler.postSimpleForm);

module.exports = router;
