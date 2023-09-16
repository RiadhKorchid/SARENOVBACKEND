import express from "express"
import { signIn,signUp,forgetPassword, refreshToken } from "../controllers/authControllers.js";
const router = express.Router()

router.post("/signin",signIn)
router.post("/signup",signUp)
router.post("/forget-password",forgetPassword)
router.post("/refreshToken",refreshToken)

export default router;



