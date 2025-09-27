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
  let priceSort = false;
  let flightDate = new Date().toLocaleDateString('en-CA'); // default today YYYY-MM-DD

  // Parse query params
  if (query.travel) [dept_city, arrival_city] = query.travel.split("-");
  if (query.priceRange) {
    [minCost, maxCost] = query.priceRange.split("-").map(Number);
    if (!isNaN(minCost) && isNaN(maxCost)) maxCost = Infinity;
  }
  if (query.traveller) traveller = Math.max(1, Number(query.traveller));
  if (query.flightDate) flightDate = query.flightDate;
  if (query.priceSort === "true" || query.priceSort === true) priceSort = true;

  if (!dept_city || !arrival_city) return [];

  try {
    // Fetch flights by airports
    const filters = {};
    let flights = await flightRepo.getAllTheFlightsBasedOnDept_Arrival(
      dept_city,
      arrival_city,
      filters
    );

    // Filter by price
    if (!isNaN(minCost) && !isNaN(maxCost)) {
      flights = flights.filter(f => f.price >= minCost && f.price <= maxCost);
    }

    // Filter by available seats
    flights = flights.filter(f => f.airplane.capacity - f.bookedSeats >= traveller);

    // Filter by flight date (arrival)
    flights = flights.filter(f => {
      const arrivalDate = new Date(f.arrivalAirportTime).toLocaleDateString('en-CA');
      return arrivalDate === flightDate;
    });

    // Sort by price if requested
    if (priceSort) flights.sort((a, b) => a.price - b.price);

    logger.info("Fetched flights successfully", flights);
    return flights;
  } catch (error) {
    logger.error("Error fetching flights", error);
    throw error;
  }
}