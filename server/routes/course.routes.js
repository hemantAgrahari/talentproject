import express from 'express';
import { getCourse } from '../controllers/course.controller.js';


const router = express.Router();


router.get('/coursedetails', getCourse);


export default router;