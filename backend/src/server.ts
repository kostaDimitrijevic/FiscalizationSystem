import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fiscalizationDB');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok')
})


const router = express.Router();