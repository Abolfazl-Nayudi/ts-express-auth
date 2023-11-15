import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { connectDB } from './config/mongo.config';
import { router } from './routes/auth.route';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './lib/notFoundHandler';
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('home page');
});

app.use('/auth', router);

app.all('*', notFoundHandler);

const PORT = 4000;
const connect = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
};

connect();
