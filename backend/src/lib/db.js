import {ENV} from './env.js';
import mongoose from 'mongoose';

export const connectDB =async () => {
    try {
        if(!ENV.MONGO_URL){
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        await mongoose.connect (ENV.MONGO_URL);
        console.log("✅Connected to MongoDB");
    }
    catch(error){
        console.error("❌Error connecting to MongoDB", error);
        process.exit(1); // 0 means success, 1 means failure
    }
}