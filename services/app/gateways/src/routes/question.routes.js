import express from 'express'
import { allQuestion, createquestion } from '../controllers/questions.controller.js';

const router = express.Router();

router.post('/createques', createquestion);
router.get('/getquestions', allQuestion);



export default router;