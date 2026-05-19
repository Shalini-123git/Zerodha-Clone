import express from 'express';
const router = express.Router();
import { loginController, signupController, loggedInUser} from '../controllers/authController.js';
import { userVerification } from '../middleware/authMiddleware.js';

router.post('/', userVerification)
router.get("/me", loggedInUser);
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true
        });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
})

export default router;