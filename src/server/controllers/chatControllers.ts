import { Request, Response, NextFunction } from 'express';
const fs = require('fs');

const chatControllers = {

    getMessages : async (req: Request, res: Response, next: NextFunction) => {
        console.log('testing')
        const getMessages = async () => {
            let res;
            fs.readFile('../db.json', 'utf-8', (err: any, data: any) => {
                if (err) throw new Error('error reading file');
                res = JSON.parse(data);
            });
            return res;
        };
        try {
            const messages = await getMessages();
            res.locals.messages = messages;
        } catch(err){
            console.log(err);
        }
    }
};

module.exports = chatControllers;