import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser'
var cors = require('cors');
import connectToDatabase from './config/dbConfig.js';
import UserRoutes from './routes/user.routes.js';
import CourseRoutes from './routes/course.routes.js';

config();
const app = express();
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
