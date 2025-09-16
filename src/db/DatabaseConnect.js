import mongoose from "mongoose";
import {MONGO_URI} from "../config/dotenv.js" ; 
import { logger } from "../config/logger-config.js";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(MONGO_URI) ; 
        logger.info(`Database is connected`) ; 
    } catch (error) {
        logger.error(`Unable to connect to database ${error.message}`) ; 
        throw error ; 
    }
}