import {OAuth2Client} from 'google-auth-library'
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