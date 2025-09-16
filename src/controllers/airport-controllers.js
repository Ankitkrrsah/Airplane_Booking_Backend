import { createAirportService, getAirportByIdService , deleteAirportByIdService, updateAirportByIdService , getAllAirportService} from "../services/airport-services.js";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger-config.js";
import { errorResponse } from "../utils/common/success-error-response.js";
import { successResponse } from "../utils/common/success-error-response.js";
import { isValidIdByMongoose } from "../utils/idCheckerForMongoose.js";

export const createAirportController = async (req , res)=>{
    const {name , code , address , cityId} = req.body ; 
    
    if(!name || !code || !address || !cityId) {
        logger.warn(`All the feilds are not present`);
        errorResponse.message = "All feilds are required" ; 
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if(!isValidIdByMongoose(cityId)) {
        const response = {...errorResponse , message : `Invalid ID`} ; 
        return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
    }

    try {
        const airport = await createAirportService({name , code , address , cityId}) ; 
        if(!airport){
            const response = {...errorResponse , message : `Unable to create airport at createAirport controller`} ; 
            return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
        }
        const response = {...successResponse , message : `Successfully created the airport` , data : airport} ; 
        return res.status(StatusCodes.OK).json(response) ; 
    } catch (error) {
        const response = {...errorResponse , message : `${error.message}` , data: error} ; 
        return res.status(StatusCodes.BAD_REQUEST).json(response) ;
    }
}

export const getAirportsController = async (req , res)=>{
    try {
        const airports = await getAllAirportService() ; 
        const response = {...successResponse , message : `All airports Sucessfully fetched` , data : airports} ; 
        return res.status(StatusCodes.OK).json(response) ; 
    } catch (error) {
        const response = {...errorResponse , message :error.message , data : error} ; 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response) ; 
    }
}


export const getAirportByIdController = async (req , res)=>{
    const {id} = req.body ; 
    console.log(id) ; 
    if(!id || !isValidIdByMongoose(id) || typeof id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(id)){
        console.log(typeof id) ; 
        errorResponse.message = "Correct Id is required" ; 
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse) ;
    }
    try {
        const airport = await getAirportByIdService(id) ; 
        if(!airport){
            const response = {...errorResponse , message : `Airport doesn't exists`} ; 
            return res.status(StatusCodes.BAD_REQUEST).json(response) ;
        }
        const response = {...successResponse , message : `Airport found` , data : airport}
        console.log(airport) ; 
        return res.status(StatusCodes.OK).json(response) ;
    } catch (error) {
        const response = {...errorResponse , message : `${error.message}` , error} ; 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response) ;
    } 
}

export const deleteAirportByIdController = async (req , res) =>{
    const {id} = req.body ; 
    if(!id || !isValidIdByMongoose(id)){
        errorResponse.message = "Correct Id is required" ; 
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse) ;
    }

    try {
        const deletedAirport = await deleteAirportByIdService(id) ; 
        if(!deletedAirport){
            const response = {...errorResponse , message : `Airport doesn't exists`} ; 
            return res.status(StatusCodes.BAD_REQUEST).json(response) ;
        }
    
        const response = {...successResponse , message : `Airport deleted` , data : deletedAirport}
        return res.status(StatusCodes.OK).json(response) ;
    } catch (error) {
        const response = {...errorResponse , message : `${error.message}` , error} ; 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response) ;
    }
}


export const updateAirportByIdController = async (req , res)=>{
    const {id , data} = req.body ; 
    if(!id || !isValidIdByMongoose(id)){
        const response = {...errorResponse , message : `Correct id is required`} ; 
        return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
    }

    if (!data || Object.keys(data).length === 0) {
  const response = {...errorResponse , message : `Data can't be empty`} ; 
  return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
}

    try {
        const updatedAirport = await updateAirportByIdService(id , data) ; 
        if(!updatedAirport){
            const response = {...errorResponse , message : `Unable to find and update the airport`} ; 
            return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
        }
    
        const response = {...successResponse , message : `Updated the airport` , data : updatedAirport } ; 
        return res.status(StatusCodes.OK).json(response) ; 
    } catch (error) {
        const response = {...errorResponse , message : `${error.message}` , data : error} ; 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response) ; 
    }
}

