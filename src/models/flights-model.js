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
    index: true, // critical index
  },
  departureAirportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airports",
    required: true,
    index: true, // critical index
  },
  arrivalAirportTime: {
    type: Date,
    required: true,
    index: true, // useful for date filtering
  },
  departureAirportTime: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    index: true, // useful for range queries + sorting
  },
  boardingGate: {
    type: Number,
    default: null,
  },
  totalAvlSeats: {
    type: Number,
    default: 350,
  },
  bookedSeats: {
    type: Number,
    default: 0,
  },
});

// compound indexes for high-performance flight lookups
flightSchema.index({ arrivalAirportId: 1, departureAirportId: 1 });
flightSchema.index({ arrivalAirportId: 1, departureAirportId: 1, price: 1 });
flightSchema.index({ arrivalAirportId: 1, departureAirportId: 1, arrivalAirportTime: 1 });

export const Flight = mongoose.model("Flights", flightSchema);