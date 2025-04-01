import express from 'express';
import { insertData } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/createuser', insertData);


export default router;