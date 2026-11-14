import * as authController from "./auth.controller.js"
import { Router } from "express";
import { loginDto, loginWithGoogleDto, registerDto,sendOtpDto,verfiyAccountDto } from "./auth.dto.js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
export const authRouter = Router();
authRouter.post("/register",validationMiddleware(registerDto),authController.register)
authRouter.patch("/verify-account",validationMiddleware(verfiyAccountDto),authController.VerifyAccount)
authRouter.post("/send-otp",validationMiddleware(sendOtpDto),authController.sendOtp)

authRouter.post("/login",validationMiddleware(loginDto),authController.login)
authRouter.post("/login-with-google",validationMiddleware(loginWithGoogleDto),authController.loginWithGoogle)
