import mongoose from "mongoose";
import { cityModel } from "../models/city-model.js";
import { connectDB } from "../db/DatabaseConnect.js";
import { logger } from "../config/logger-config.js";

connectDB() ; 
const cities = [
    { name: "Delhi" },
    { name: "Mumbai" },
    { name: "Bangalore" },
    { name: "Chennai" },
    { name: "Hyderabad" },
    { name: "Kolkata" },
    { name: "Pune" },
    { name: "Ahmedabad" },
    { name: "Jaipur" },
    { name: "Lucknow" }
];

const seed =async ()=>{
    try {
        await cityModel.deleteMany({}) ; 
        await cityModel.insertMany(cities) ; 
        logger.info(`seeding done`) ;
    } catch (error) {
        logger.error(`${error}`) ; 

    }finally{
        mongoose.disconnect() ; 
        logger.info(`Database disconnected successfully after seeding`)
    }
}

seed() ; 



