// import express, { Request, Response, NextFunction } from 'express';
// import path from "path";
// import { fileURLToPath } from 'url';
// import { ExpressError } from '../@types';
// import { router } from './routes/api';
import { ExpressError } from '../@types';
import { Request, Response, NextFunction } from 'express';
const express = require('express');
const path = require('path');
const router = require('./routes/api')


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../../dist')));
};

app.use('/api', router);

app.use((req: Request, res: Response) => res.status(404).send('page not found'));

app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}.`);
});