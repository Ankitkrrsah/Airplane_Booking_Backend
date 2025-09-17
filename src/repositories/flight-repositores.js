import { CrudRepositories } from "./crud-repositories.js";
import { Flight } from "../models/flights-model.js";
import { logger } from "../config/logger-config.js";
import { airportModel } from "../models/airport-model.js";
export class FlightRepository extends CrudRepositories {
  constructor() {
    super(Flight);
  }

//   async getAllTheFlightsBasedOnDept_Arrival(dept_city, arrival_city) {
//     try {
//       const allFlights = await Flight.find({})
//         .populate({
//           path: "arrivalAirportId",
//           match: { code: arrival_city },
//         })
//         .populate({
//           path: "departureAirportId",
//           match: { code: dept_city },
//         });

//         let flights = [] ; 

//         allFlights.forEach((data)=>{
//             if(data.arrivalAirportId !=null && data.departureAirportId !=null){
//                 flights.push(data) ; 
//             }
//         })
//         console.log(flights) ; 
//         return allFlights ; 
//     } catch (error) {
//       logger.error("Error occurred in flight_repo", error);
//       throw error;
//     }
//   }
 

   // this can search all the flights in O(Log(N)) time 
   async getAllTheFlightsBasedOnDept_Arrival(dept_city, arrival_city) {
  try {
    // run both airport lookups in parallel
    const [arr, dept] = await Promise.all([
      airportModel.findOne({ code: arrival_city }),
      airportModel.findOne({ code: dept_city }),
    ]);

    if (!arr || !dept) {
      return []; // no such airports
    }

    const avlFlights = await Flight.find({
      arrivalAirportId: arr._id,
      departureAirportId: dept._id,
    })
      .populate("arrivalAirportId")
      .populate("departureAirportId");

    console.log(avlFlights);
    return avlFlights; //returns an array 
  } catch (error) {
    logger.error("Error occurred in flight_repo", error);
    throw error;
  }
}
}
