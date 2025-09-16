import mongoose from "mongoose";

const airportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cities",
    required: true,
  },
});


airportSchema.pre(['find', 'findOne', 'findById'], function (next) {
  this.populate('cityId', 'name'); 
  next();
});


export const airportModel = mongoose.model("Airports", airportSchema);