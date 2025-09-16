import { connectDB } from "../db/DatabaseConnect.js";
import { airplaneModel } from "../models/airplane-models.js";
import { logger } from "../config/logger-config.js";
import mongoose from "mongoose";
connectDB() ; 


const airplanes = [
  { modelNumber: 'Boeing 737', capacity: 160 },
  { modelNumber: 'Airbus A320', capacity: 180 },
  { modelNumber: 'Boeing 777', capacity: 396 },
  { modelNumber: 'Airbus A380', capacity: 853 },
  { modelNumber: 'Embraer E190', capacity: 114 },
  { modelNumber: 'Bombardier CRJ900', capacity: 90 },
  { modelNumber: 'Boeing 787 Dreamliner', capacity: 296 },
  { modelNumber: 'Airbus A350', capacity: 350 }
];


const seed = async()=>{
    try {
        await airplaneModel.deleteMany({}) ; 
        await airplaneModel.insertMany(airplanes) ; 
        logger.info("DB Droped and Airplanes inserted for testing ✅") ; 
    } catch (error) {
        logger.error("Error occured while sedding airplanes") ; 
        throw error ; 
    }finally{
        mongoose.disconnect() ;
        logger.info(`Database disconnected successfully after seeding`) ; 
    }
}

seed() ;