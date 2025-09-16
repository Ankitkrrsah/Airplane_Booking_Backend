import { logger } from "../config/logger-config.js";
import { FlightRepository } from "../repositories/flight-repositores.js" ;
import { timeHandler } from "../utils/helper/time_handler.js";
import { Flight } from "../models/flights-model.js";
const flightRepo = new FlightRepository() ; 
export async function createFlightService (data) {
    try { 
        const flight = await flightRepo.create(data) ; 
        if(data.arrivalAirportTime && data.departureAirportTime){
            if(!timeHandler(data.arrivalAirportTime , data.departureAirportTime)){
                logger.warn(`Mistake in Timings of airport arrival or departure`) ; 
                return {} ; 
            }
        }
        logger.info(`Data sucessfully added from services : ${flight}`);
        return flight ; 
    } catch (error) {
        logger.error(`Error occured in services ${error.message}`)
        throw error ; 
    }
}

export async function getAllFlightsService(dept_city, arrival_city) {
  try {
    const result=await flightRepo.getAllTheFlightsBasedOnDept_Arrival(dept_city , arrival_city) ;
    return result ; 
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
}