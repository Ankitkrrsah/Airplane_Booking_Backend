import mongoose from "mongoose";
import { connectDB } from "../db/DatabaseConnect.js";
import { seatModel } from "../models/seat-model.js";
import { airplaneModel } from "../models/airplane-models.js";
import { seatType } from "../utils/common/enums.js";

const { ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS } = seatType;

connectDB() ; 
console.log("✅ Database sucessfully connected!");

async function seedSeats() {
  const airplanes = await airplaneModel.find({});
  const totalCols = 6; // A-F
  const colNames = ["A", "B", "C", "D", "E", "F"];
  const seats = [];

  airplanes.forEach((airplane) => {
    let totalCapacity = airplane.capacity || 100; // fallback
    const totalRows = Math.ceil(totalCapacity / totalCols);

    // Seat distribution
    const firstClassRows = Math.max(1, Math.floor(totalRows * 0.05));
    const businessRows = Math.max(1, Math.floor(totalRows * 0.1));
    const premiumRows = Math.max(1, Math.floor(totalRows * 0.15));
    const economyRows = totalRows - (firstClassRows + businessRows + premiumRows);

    // Generate seats row by row
    for (let r = 1; r <= totalRows; r++) {
      let typeOfSeat;
      if (r <= firstClassRows) typeOfSeat = FIRST_CLASS;
      else if (r <= firstClassRows + businessRows) typeOfSeat = BUSINESS;
      else if (r <= firstClassRows + businessRows + premiumRows) typeOfSeat = PREMIUM_ECONOMY;
      else typeOfSeat = ECONOMY;

      // Now assign columns A-F for each row
      for (let c = 0; c < totalCols; c++) {
        seats.push({
          airplaneId: airplane._id,
          row: r,
          column: colNames[c],
          seatType : typeOfSeat,
        });
      }
    }
  });

  await seatModel.insertMany(seats);
  mongoose.disconnect() ; 
  console.log("✅ Database sucessfully disconnected!");
  console.log("✅ Seats seeded successfully!");
}

seedSeats() ; 