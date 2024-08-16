import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser'
var cors = require('cors');
import connectToDatabase from './config/dbConfig.js';
import UserRoutes from './routes/user.routes.js';
import CourseRoutes from './routes/course.routes.js';

config();
const app = express();
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors())
app.use(cookieParser());
app.use(express.json());


app.use('/api/user', UserRoutes);
app.use('/api/course', CourseRoutes);

app.use("*", (req, res) => {
    res.status(400).send('Page not found!');
});

app.listen(`${process.env.PORT}`, async () => {
    await connectToDatabase();
    console.log(`Server is running on port ${process.env.PORT} `);
});
