import express from 'express';
import { insertData, refreshToken, signin, userProfile } from '../controllers/auth.controller.js';
import { validateUserData } from '../utils/uploadMiddleware.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/createuser', 
    // validateUserData,
    insertData
);

router.post("/signin",signin)
router.post("/refresh",refreshToken)
router.get("/getprofile",verifyToken,userProfile)


export default router;