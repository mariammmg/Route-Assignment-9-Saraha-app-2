import * as authController from "./auth.controller.js"
import { Router } from "express";
export const authRouter = Router();
authRouter.post("/register",authController.register)
authRouter.patch("/verify-account",authController.VerifyAccount)
authRouter.post("/send-otp",authController.sendOtp)

authRouter.post("/login",authController.login)
authRouter.post("/login-with-google",authController.loginWithGoogle)
