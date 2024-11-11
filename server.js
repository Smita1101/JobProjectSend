import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from 'cloudinary';
import 'express-async-errors';
// import {body, validationResult} from 'express-validator';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
// import {nanoid} from 'nanoid';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRoter.js'
import userRouter from './routes/userRouter.js';
import errorHandleMiddleware from './middleware/ErrorMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// const port = 5100;
app.use(express.json());
// app.use(morgan('dev'));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const port = process.env.PORT || 5100

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
  });

const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log("Directory Name",__dirname);
app.use(express.static(path.resolve(__dirname, './public')));

// middleware
app.use(cookieParser());
app.use(errorHandleMiddleware);
app.use('/api/v1/auth', authRouter);




app.get ('/', (req,res)=>{
    res.send('Hello World vchghghj');
});

app.post('/',(req,res)=>{
    console.log(req);
    res.json({message: 'Dta received', data: req.body});
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

// listen port at 5100
// app.listen(port, () => {
//     console.log(`Server is listening to port ${port}`);
//   });


// listen port at 5100
  try{
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port,()=>{
        console.log(`Server is listening to port ${port}`);
    });

  }catch(error){
     console.log(error);
     process.exit(1);
  }