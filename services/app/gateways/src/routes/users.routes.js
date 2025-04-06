import express from 'express'
import { createUser } from '../controllers/users.controller.js';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });

const router = express.Router();

router.post('/signup', 
    upload.fields([
      { name: 'profile_pic', maxCount: 1 },
      { name: 'additionalpictures', maxCount: 5 }
    ]),
    createUser
  );

export default router;