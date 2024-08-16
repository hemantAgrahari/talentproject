import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import connectToDatabase from './config/dbConfig.js';
import UserRoutes from './routes/user.routes.js';
import CourseRoutes from './routes/course.routes.js';

import mongoose from "mongoose";

mongoose.set('strictQuery', false);

config();
const app = express();
// CORS configuration
app.use(cookieParser());
app.use(express.json());
// CORS configuration
app.use(cors({
    origin: ["https://talentproject-react.vercel.app"], // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow credentials (cookies, etc.)
}));


console.log(`Server is running on port ${process.env.PORT} `);
app.use('/api/user', UserRoutes);
app.use('/api/course', CourseRoutes);

app.use("*", async (req, res) => {
    const { connection } = await mongoose.connect(`mongodb+srv://hemant11102219:
        ${process.env.DATABASE_PASSWORD}@cluster0.ojlnq2k.mongodb.net/assignment?retryWrites=true&w=majority&appName=Cluster0`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    res.status(400).send(connection);
});

app.listen(`${process.env.PORT}` || 5000, async () => {
    await connectToDatabase();
    console.log(`Server is running on port ${process.env.PORT} `);
});
