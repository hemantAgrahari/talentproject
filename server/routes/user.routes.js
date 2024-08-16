import express from 'express';
import { register, login, testApi } from '../controllers/user.controller.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/testApi', testApi);


export default router;