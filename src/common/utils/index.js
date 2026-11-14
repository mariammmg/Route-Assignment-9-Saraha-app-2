import {OAuth2Client} from 'google-auth-library'
import jwt from "jsonwebtoken"
import crypto from "node:crypto"
import bycrpt from "bcryptjs"
export function toMs(time, unit) {
    switch (unit) {
        case 's':
            return time * 1000;
        case 'm':
            return time * 60 * 1000;
        case 'h':
            return time * 60 * 60 * 1000;
        case 'd':
            return time * 24 * 60 * 60 * 1000;
        default:
            return 0;
    }
}
export function toSeconds(time, unit) {
    switch (unit) {
        case 's':
            return time;
        case 'm':
            return time * 60;
        case 'h':
            return time * 60 * 60;
        case 'd':
            return time * 24 * 60 * 60;
        default:
            return 0;
    }
}
export async function verifyIdtoken(idToken)
{
  const client = new OAuth2Client()
 const ticket = await client.verifyIdToken({
    idToken,
    // this is the id (key) that is between google and the audience
    // google checks that the idToken is from the same audience or not
    // for authentication   
    audience:["957326735464-drk44fcejcu0dskp3fl4lrf9c7uccqj3.apps.googleusercontent.com"]
 })
 const payload = ticket.getPayload()
 return payload
}

export  function generateAccessToken(payload)
{
   return jwt.sign(payload,'8f3a9c2d7e1b4f6a0c5d8e9f2a1b7c4d',{expiresIn:toSeconds(1,'h')})
}
export function generateOTP(){
    return crypto.randomInt(100000,999999)
}
export function hashPassword(password){
    return bycrpt.hash(password,10);
}
export function comparePassword(password,hashedPassword){
    return bycrpt.hash(password,hashedPassword);
}