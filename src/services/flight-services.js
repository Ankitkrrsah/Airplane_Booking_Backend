import { logger } from "../config/logger-config.js";
import { FlightRepository } from "../repositories/flight-repositores.js";
import { timeHandler } from "../utils/helper/time_handler.js";
import { Flight } from "../models/flights-model.js";
const flightRepo = new FlightRepository();
export async function createFlightService(data) {
  try {
    const flight = await flightRepo.create(data);
    if (data.arrivalAirportTime && data.departureAirportTime) {
      if (!timeHandler(data.arrivalAirportTime, data.departureAirportTime)) {
        logger.warn(`Mistake in Timings of airport arrival or departure`);
        return {};
      }
    }
    logger.info(`Data sucessfully added from services : ${flight}`);
    return flight;
  } catch (error) {
    logger.error(`Error occured in services ${error.message}`);
    throw error;
  }
}

export async function getAllFlightsService(query) {
  let dept_city, arrival_city;
  let minCost, maxCost;
  let traveller = 1;
  let priceSort = false ; 
  // default to today's date
  let flightDate = new Date().toISOString().slice(0, 10);

  if (query.travel) [dept_city, arrival_city] = query.travel.split("-");
  if (query.priceRange) {
    [minCost, maxCost] = query.priceRange.split("-").map((num) => parseInt(num));
  }
  if (query.traveller) {
    traveller = Number(query.traveller);
    if (traveller <= 0) traveller = 1;
  }
  if (query.flightDate) {
    flightDate = query.flightDate; // expects "YYYY-MM-DD"
  }
  if(query.priceSort) priceSort = true ;
  // if no input in any of these then return an empty array
  if (!dept_city || !arrival_city) return [];

  if (!isNaN(minCost) && isNaN(maxCost)) {
    maxCost = Infinity;
  }

  try {
    let result = await flightRepo.getAllTheFlightsBasedOnDept_Arrival(
      dept_city,
      arrival_city , 
      priceSort
    );
    // filter for price if provided
    if (!isNaN(minCost) && !isNaN(maxCost)) {
      result = result.filter(
        (data) => data.price >= minCost && data.price <= maxCost
      );
    }

    // filter for available seats
    result = result.filter(
      (data) => data.totalAvlSeats - data.bookedSeats >= traveller
    );

    // filter for date
    result = result.filter((data) => {
      const arrivalDate = new Date(data.arrivalAirportTime)
        .toISOString()
        .slice(0, 10);
      return arrivalDate === flightDate;
    });

    logger.info("Fetched all the flights", result);
    return result;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
}