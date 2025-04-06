import express from 'express';
import { insertData } from '../controllers/auth.controller.js';
import { validateUserData } from '../utils/uploadMiddleware.js';

const router = express.Router();

router.post('/createuser', 
    // validateUserData,
    insertData
);

export default router;