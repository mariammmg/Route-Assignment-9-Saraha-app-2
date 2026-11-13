import express from "express";
import "./common/db/connection.js";
import { authRouter } from "./app/auth/auth.route.js";
import mongoose from "mongoose";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors(
   {
      origin:["http://localhost:4200"]
    }
))
app.use("/api/auth", authRouter);
app.use((error,req,res,next)=>{
  res.json({message:error.message ,sucess:false})
})


const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
const shutdown= async ()=>{
  await mongoose.disconnect();
   server.close();
  console.log("Server is closed");
}
process.on("SIGINT",shutdown)
process.on("SIGTERM",shutdown)