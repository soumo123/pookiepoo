import express from 'express'
import { allQuestion, countNumofquestions, createquestion } from '../controllers/questions.controller.js';

const router = express.Router();

router.post('/createques', createquestion);
router.get('/getquestions', allQuestion);
router.get('/getcount',countNumofquestions)


export default router;