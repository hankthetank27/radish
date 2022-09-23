import { ExpressError } from '../@types';
import { Request, Response, NextFunction } from 'express';
const fs = require('fs')
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const server = require('http').Server(app);
const router = require('./routes/api');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static assests if in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
} else {
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }));
};

//websocket connection
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

//write to chat db
const readWriteJSONdb = (message: string) => {
  fs.readFile(path.resolve(__dirname, './db.json'), 'utf-8', (err: any, data: any) => {

    if (err) throw new Error(`error reading chat file: ${err}`);
    const updatedChat = [...JSON.parse(data), message];

    fs.writeFile(path.resolve(__dirname, './db.json'), JSON.stringify(updatedChat), (err: any) => {
      if (err) throw new Error(`error writing chat file: ${err}`);
    });

  });
};

//handle websocket events
io.on('connection', (socket: any) => {
  socket.on('send-message', (message: string) => {
    console.log(message);
    readWriteJSONdb(message);
    io.emit('receive-message', message);
  });
});

//connect to api router
app.use('/api', router);

app.use((req: Request, res: Response) => res.status(404).send('page not found'));

//global error handler
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

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`);
});