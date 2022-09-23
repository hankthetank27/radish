import { Request, Response, NextFunction } from 'express';
const fs = require('fs');
const path = require('path')

const chatControllers = {

  getMessages: (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    fs.readFile(path.resolve(__dirname, `../../db/db${id}.json`), 'utf-8', (err: any, data: any) => {
      if (err) throw new Error('error reading file');
      return res.send(JSON.parse(data));
    });
  },

};

module.exports = chatControllers;