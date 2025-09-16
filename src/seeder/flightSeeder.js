import mongoose from "mongoose";
import { logger } from "../config/logger-config.js";
import { connectDB } from "../db/DatabaseConnect.js";
import { Flight } from "../models/flights-model.js";
connectDB();

const flightsDetails = [
  {
    "airplane": "68c68b758a7d985e14138fa5", 
    "arrivalAirportId": "68c68b86d206f2d8c1483986", 
    "departureAirportId": "68c68b86d206f2d8c1483985", 
    "arrivalAirportTime": "2025-09-15T12:00:00.000Z",
    "departureAirportTime": "2025-09-15T09:30:00.000Z",
    "price": 5500,
    "boardingGate": 12
  },
  {
    "airplane": "68c68b758a7d985e14138fa6",
    "arrivalAirportId": "68c68b86d206f2d8c1483987",
    "departureAirportId": "68c68b86d206f2d8c1483986",
    "arrivalAirportTime": "2025-09-16T16:45:00.000Z",
    "departureAirportTime": "2025-09-16T14:00:00.000Z",
    "price": 6200,
    "boardingGate": 7
  },
  {
    "airplane": "68c68b758a7d985e14138fa7",
    "arrivalAirportId": "68c68b86d206f2d8c1483988",
    "departureAirportId": "68c68b86d206f2d8c1483987",
    "arrivalAirportTime": "2025-09-17T20:30:00.000Z",
    "departureAirportTime": "2025-09-17T17:00:00.000Z",
    "price": 8900,
    "boardingGate": 18
  },
  {
    "airplane": "68c68b758a7d985e14138fa9",
    "arrivalAirportId": "68c68b86d206f2d8c1483989",
    "departureAirportId": "68c68b86d206f2d8c1483988",
    "arrivalAirportTime": "2025-09-18T11:15:00.000Z",
    "departureAirportTime": "2025-09-18T09:00:00.000Z",
    "price": 4300,
    "boardingGate": 5
  },
  {
    "airplane": "68c68b758a7d985e14138fac",
    "arrivalAirportId": "68c68b86d206f2d8c148398a",
    "departureAirportId": "68c68b86d206f2d8c1483989",
    "arrivalAirportTime": "2025-09-19T22:10:00.000Z",
    "departureAirportTime": "2025-09-19T18:45:00.000Z",
    "price": 10500,
    "boardingGate": 21
  }
]


const seed = async () => {
  try {
    await Flight.deleteMany({});
    await Flight.insertMany(flightsDetails);
    logger.info("DB Droped and Flight inserted for testing ✅");
  } catch (error) {
    logger.error("Error occured while sedding airplanes");
    throw error;
  } finally {
    mongoose.disconnect();
    logger.info(`Database disconnected successfully after seeding`);
  }
};


seed() ; 