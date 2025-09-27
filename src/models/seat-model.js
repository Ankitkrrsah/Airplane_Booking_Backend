import { Schema, model } from "mongoose";
import { seatType } from "../utils/common/enums.js";

const { ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS } = seatType;

const seatSchema = new Schema({
  airplaneId: {
    type: Schema.Types.ObjectId,   
    ref: "Airplane",
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: String,
    required: true,
    maxlength: 1, 
  },
  seatType: {
    type: String,
    enum: [ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS],
    default: ECONOMY,
  },
});

export const seatModel = model("Seat", seatSchema);