import { User } from "./user.model.js";
export async function findUserByemail(email) {
  const user = await User.findOne({ email });
  return user;
}
export async function CreateUser(name, email,hashedpassword) {
  const data = {
    userName:name,
    password:hashedpassword,
    email
  };
  const newUser = new User(data);
  const savedUser = await newUser.save();
  return savedUser;
}
export async function UpdateUser(isVerified,_id){
   return await User.findOneAndUpdate({_id},isVerified,{returnDocument:"after"})
}
export async function CreatenewUser(data) {
  
  const newUser = new User(data);
  const savedUser = await newUser.save();
  return savedUser;
}
