import mongoose from "mongoose";
import { airportModel } from "../models/airport-model.js";
import { connectDB } from "../db/DatabaseConnect.js";
import { logger } from "../config/logger-config.js" ; 

connectDB() ; 


const airports = [
  {
    name: "Indira Gandhi International Airport",
    code: "DEL",
    address: "New Delhi, Delhi 110037",
    cityId: "6888f2225f0cd0b74716c896", // Delhi
  },
  {
    name: "Chhatrapati Shivaji Maharaj International Airport",
    code: "BOM",
    address: "Mumbai, Maharashtra 400099",
    cityId: "6888f2225f0cd0b74716c897", // Mumbai
  },
  {
    name: "Kempegowda International Airport",
    code: "BLR",
    address: "Bangalore, Karnataka 560300",
    cityId: "6888f2225f0cd0b74716c898", // Bangalore
  },
  {
    name: "Chennai International Airport",
    code: "MAA",
    address: "Chennai, Tamil Nadu 600027",
    cityId: "6888f2225f0cd0b74716c899", // Chennai
  },
  {
    name: "Rajiv Gandhi International Airport",
    code: "HYD",
    address: "Hyderabad, Telangana 500409",
    cityId: "6888f2225f0cd0b74716c89a", // Hyderabad
  },
  {
    name: "Netaji Subhas Chandra Bose International Airport",
    code: "CCU",
    address: "Kolkata, West Bengal 700052",
    cityId: "6888f2225f0cd0b74716c89b", // Kolkata
  },
  {
    name: "Pune International Airport",
    code: "PNQ",
    address: "Pune, Maharashtra 411032",
    cityId: "6888f2225f0cd0b74716c89c", // Pune
  },
  {
    name: "Sardar Vallabhbhai Patel International Airport",
    code: "AMD",
    address: "Ahmedabad, Gujarat 380003",
    cityId: "6888f2225f0cd0b74716c89d", // Ahmedabad
  },
  {
    name: "Jaipur International Airport",
    code: "JAI",
    address: "Jaipur, Rajasthan 302017",
    cityId: "6888f2225f0cd0b74716c89e", // Jaipur
  },
  {
    name: "Chaudhary Charan Singh International Airport",
    code: "LKO",
    address: "Lucknow, Uttar Pradesh 226009",
    cityId: "6888f2225f0cd0b74716c89f", // Lucknow
  },
];

const seed = async ()=>{
    try {
        await airportModel.deleteMany({}) ; 
        await airportModel.insertMany(airports) ;
        logger.info(`seeding done`) ;  
    } catch (error) {
        logger.error(`${error}`) ;
    }finally{
            mongoose.disconnect() ; 
            logger.info(`Database disconnected successfully after seeding`)
    }
}

seed() ; 