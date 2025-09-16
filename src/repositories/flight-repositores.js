import { CrudRepositories } from "./crud-repositories.js";
import { Flight } from "../models/flights-model.js";
import { logger } from "../config/logger-config.js";
export class FlightRepository extends CrudRepositories {
  constructor() {
    super(Flight);
  }

  async getAllTheFlightsBasedOnDept_Arrival(dept_city, arrival_city) {
    try {
      const allFlights = await Flight.find({})
        .populate({
          path: "arrivalAirportId",
          match: { code: arrival_city },
        })
        .populate({
          path: "departureAirportId",
          match: { code: dept_city },
        });

        let flights = [] ; 

        allFlights.forEach((data)=>{
            if(data.arrivalAirportId !=null && data.departureAirportId !=null){
                flights.push(data) ; 
            }
        })
        console.log(flights) ; 
        return allFlights ; 
    } catch (error) {
      logger.error("Error occurred in flight_repo", error);
      throw error;
    }
  }
}
