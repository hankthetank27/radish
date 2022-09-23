import { Request, Response } from 'express';
const express = require('express');
const chatControllers = require('../controllers/chatControllers');
const router = express.Router();

router.get('/getMessages', chatControllers.getMessages)

module.exports = router;