import express from 'express';
const router = express.Router();
import { loginController, signupController} from '../controllers/authController.js';
import { userVerification } from '../middleware/authMiddleware.js';

router.post('/', userVerification)
router.post("/signup", signupController);
router.post("/login", loginController);

export default router;