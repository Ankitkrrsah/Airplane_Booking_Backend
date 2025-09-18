import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger-config.js";
import { errorResponse  , successResponse } from "../utils/common/success-error-response.js";
import { createFlightService , getAllFlightsService } from "../services/flight-services.js";
import { isValidIdByMongoose } from "../utils/idCheckerForMongoose.js";
import { Flight } from "../models/flights-model.js";

export const createFlightController = async (req , res)=>{
    const {airplane , arrivalAirportId , departureAirportId , arrivalAirportTime ,departureAirportTime , boardingGate , price } = req.body ; 
     if(!airplane || !arrivalAirportId || !departureAirportId || !arrivalAirportTime || !departureAirportTime || !price ){
        const response = {...errorResponse , message : `All the feilds are required ` } ; 
        return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
     }

     if(!isValidIdByMongoose(arrivalAirportId) || !isValidIdByMongoose(departureAirportId)) {
        const response = {...errorResponse , message : `Correct id is requried`} ; 
        return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
     }

    try {
        const flight = await createFlightService({airplane , arrivalAirportId , departureAirportId , arrivalAirportTime ,departureAirportTime , boardingGate , price}) ;
    
        if(!flight){
            const response = {...errorResponse , message : `Unable to create the flight` } ; 
            return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
        }
    
        const response = {...successResponse , message : `Sucessfully created the flight` , data : flight } ; 
        return res.status(StatusCodes.OK).json(response) ; 
    } catch (error) {
        const response = {...errorResponse , message : `${error.message}` , data : error} ; 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response) ; 
    }
}


export const getAllFlightsController = async (req , res)=> {
    try {
        const result = await getAllFlightsService(req.query) ; 
        const response = {...successResponse , message : `Sucessfully fetched all the flights` , data : result} ;
        console.log("Hii" , result) ;
        return res.status(StatusCodes.OK).json(response); 
    } catch (error) {
        const response = {...errorResponse , message : `${error.message}` , data : error} ; 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response) ; 
    }
}
