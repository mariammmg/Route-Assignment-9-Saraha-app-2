// file for validation dto means making validations and transformation on data and transfer it into object
import {z} from "zod"
export const registerDto=z.object({
    userName:z.string().trim().min(2).max(20),
    email:z.email().trim().toLowerCase(),
    password:z.string().trim().min(8).toLowerCase(),
    profilePicPath: z.string().optional()
})
export const loginDto=z.object({
    email:z.email().trim().toLowerCase(),
    password:z.string().min(8),
})
export const verfiyAccountDto =z.object({
    email:z.email().trim().toLowerCase(),
    code:z.string().length(6)
}) 
export const sendOtpDto=z.object({
    email:z.email().trim().toLowerCase()
})
export const loginWithGoogleDto=z.object({
    idToken:z.string()
})
