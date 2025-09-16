import { populate } from "dotenv";
import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airplane: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airplane",
    required: true,
  },
  arrivalAirportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airports",
    required: true,
  },
  departureAirportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airports",
    required: true,
  },
  arrivalAirportTime: {
    type: Date,
    required: true,
  },
  departureAirportTime: {
    type: Date,
    required: true,
  },
  price : {
    type : Number , 
    required : true , 
  } ,
  boardingGate: {
    type: Number,
    default: null,
  }
});


export const Flight = mongoose.model("Flights", flightSchema);