const express = require('express');
const chatControllers = require('../controllers/chatControllers');
const router = express.Router();

router.get('/getMessages/:id', chatControllers.getMessages);


module.exports = router;
export {};