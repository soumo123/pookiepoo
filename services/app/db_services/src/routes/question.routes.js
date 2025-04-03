import express from 'express';
import { create, deleteData, getData, updateData } from '../controllers/question.controller.js';

const router = express.Router();

router.post('/createquestion', create);
router.get('/getData', getData);
router.put('/updatedata', updateData);
router.delete('/deletedata', deleteData);


export default router;