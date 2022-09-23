import { Request, Response } from 'express';
const express = require('express');
const chatControllers = require('../controllers/chatControllers');
const router = express.Router();

router.get('/getMessages', chatControllers.getMessages, (req: Request, res: Response) => {
    res.json(res.locals.messages);
})

module.exports = router;