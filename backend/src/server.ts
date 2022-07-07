import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes'
import companiesRouter from './routers/company.routes'
import activityRouter from './routers/activitycode.routes';
import articalRouter from './routers/artical.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fiscalizationDB');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/companies', companiesRouter)
router.use('/activitycode', activityRouter)
router.use('/artical', articalRouter)

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));