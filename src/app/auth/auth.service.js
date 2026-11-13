import * as userRepo from "../User/user.repository.js";
import { sendMail } from "../../common/email/nodemailer.js";
import * as authRepo from "./auth.repository.js"
import { toMs,toSeconds } from "../../common/utils/time.js";
import bcrypt from "bcryptjs";
import crypto from 'node:crypto'
import jwt from "jsonwebtoken";
import { verifyIdtoken } from "../../common/utils/google.auth.js";
export async function register(userName,email,password){
    const user = await userRepo.findUserByemail(email)
    
    if(user){
        throw new Error("User already exists")
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const newUser = await userRepo.CreateUser(userName,email,hashedpassword)
    const code =crypto.randomInt(100000,999999)
    await authRepo.createOtp(code,newUser._id,new Date(  Date.now()+ toMs(15,'m')))
    await sendMail(email,"Verfiy account",`<h3>your code is ${code}<h3>`)
    delete newUser.password
    newUser.password=undefined
    return newUser
}
export async function verfiyAccount(code,email){
 const user = await userRepo.findUserByemail(email)
    
    if(!user){
        throw new Error("User not found")
    }
    const Otp= await authRepo.findOtpByUserId(user._id)
    if(!Otp){
        throw Error("invalid code or expired code ")
    }
    if(Otp.code !== code){
        throw Error("invalid code ")
    }
    if(Otp.expiredAt < new Date()){
        throw Error("invalid code or expired code ")
    }
    const updateduser =await userRepo.UpdateUser({isVerified:true},user._id)
    await authRepo.deleteOtp(user._id)
    
}
export async function sendOtp(email){
const user = await userRepo.findUserByemail(email)
    
    if(!user){
        throw new Error("User not found")
    }
    await authRepo.deleteAllOtps(user._id)
    const code =crypto.randomInt(100000,999999)
    await authRepo.createOtp(code,user._id,new Date(  Date.now()+ toMs(5,'m')))
    await sendMail(email,"Verfiy account",`<h3>your code is ${code}<h3>`)
}
export async function login(email,password){
    const user = await userRepo.findUserByemail(email)

    if(!user){
        throw new Error("User not found")
    }
    if(!user.isVerified){
        throw new Error("Please verify your account")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("Invalid password")
    }
    const payload={
        name:user.userName,
        email:user.email,
        id:user._id
    }
    const token = jwt.sign(payload,'8f3a9c2d7e1b4f6a0c5d8e9f2a1b7c4d',{expiresIn:toSeconds(1,'h')})
    return token
}
 


export async function loginWithGoogle(idToken){
    //we verify idtoken that comes from FE login with google page
    const payload = await verifyIdtoken(idToken)
    // user exists return  token for this user
    const user = await userRepo.findUserByemail(payload.email)
    if(user){
        const accessToken= jwt.sign({email:user.email,id:user._id},'8f3a9c2d7e1b4f6a0c5d8e9f2a1b7c4d',{expiresIn:toSeconds(1,'h')})
        return accessToken
    }
    // if not exist create new user in database and generate token for the user
    const newUser = await userRepo.CreatenewUser({
        userName:payload.name,
        email:payload.email,
        providerPicPath:payload.picture,
        provider:"google",
        isVerified:true
    })
    const accessToken= jwt.sign({email:newUser.email,id:newUser._id},'8f3a9c2d7e1b4f6a0c5d8e9f2a1b7c4d',{expiresIn:toSeconds(1,'h')})
    return accessToken
    
}