import express, { Request, Response, NextFunction } from 'express';
import path from "path";
import { api } from "./routes/api.ts"
import { Error } from '../types.ts';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
})

export {};