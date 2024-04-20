import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose'
import multer from 'multer';
import ex from './models.js';
import {register, login, logout} from './authoControl.js';
import dotenv from 'dotenv';
import userRouter from './userRoutes.js';
import doctorRouter from './doctorRouter.js';


const app = express();
const port = 4000;
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/files',express.static('files'));


const corsOptions = {
    origin: '*',
    credentials : true,
    optionSuccessStatus : 200
}

app.use(cors(corsOptions));
app.use('/users', userRouter);
app.use('/doctors',doctorRouter);

mongoose.connect("mongodb://127.0.0.1:27017/healthSyncDB", {UseNewUrlParser : true}).then(function(){
      console.log("connected")}).catch(function(err){
      console.log(err);
});




app.post('/register',register);
app.post('/login',login);
app.get('/logout', logout);
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });