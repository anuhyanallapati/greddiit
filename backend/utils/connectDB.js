import mongoose from "mongoose";
import env from 'dotenv';
env.config();

export default async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        
        // if it reaches this point that means connection is successful
        console.log("Connected to DB");
    }
    catch(err)
    {
        // if it isn't successful it'll come here
        console.error("Error in connecting db:", err);
    }
}