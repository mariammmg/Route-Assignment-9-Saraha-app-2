import * as authService from "./auth.service.js"
export async function register (req,res,next)
{
    try{
        const {userName,email,password}=req.body
        const user=await authService.register(userName,email,password)
        res.status(201).json({message:"User Created ",sucess:true,data:user})
    }catch(error){
        next(error)
    }
}
export async function VerifyAccount (req,res,next)
{
    try{
        const {email,code}=req.body
        const user=await authService.verfiyAccount(code,email)
        res.status(201).json({message:"User verified Succefully ",sucess:true,data:user})
    }catch(error){
        next(error)
    }
}
export async function sendOtp (req,res,next)
{
    try{
        const {email}=req.body
        await authService.sendOtp(email)
        res.status(201).json({message:"send Otp Succesfully ",sucess:true})
    }catch(error){
        next(error)
    }
}
export async function login (req,res,next) {
    try{
        const {email,password}=req.body
        const user=await authService.login(email,password)
        res.status(201).json({message:"User Login Succefully ",sucess:true,data:user})
    }catch(error){
        next(error)
    }
}
export async function loginWithGoogle(req,res,next){
    try{
        const {idToken}=req.body
        const user=await authService.loginWithGoogle(idToken)
        res.status(201).json({message:"User Login Succefully ",sucess:true,data:user})
    }catch(error){
        next(error)
    }
}