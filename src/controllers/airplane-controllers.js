import { createAirplaneService , getAirplanesService , getAirplaneByIdService , deleteAirplanesByIdService , updateAirplaneByIdService} from "../services/airplane-services.js";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger-config.js";
import { isValidIdByMongoose } from "../utils/idCheckerForMongoose.js";
import { errorResponse } from "../utils/common/success-error-response.js";
import { successResponse } from "../utils/common/success-error-response.js";


export const createAirplaneController = async (req, res) => {
    let { modelNumber, capacity } = req.body;

    if (!modelNumber) {
        logger.warn(`Model number is not given`);
        errorResponse.message = "Model number is required" ; 
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    
    if (!capacity || capacity < 0 || !Number.isFinite(capacity)) {
        capacity = 0;
    }

    try {
        const result = await createAirplaneService({ modelNumber, capacity });
        logger.info(`Created airplane at controller`);
        successResponse.message = "Successfully created airplane";
        successResponse.data = result ; 
        return res.status(StatusCodes.CREATED).json(successResponse);
    } catch (error) {
        logger.error(`Unable to create the airplane at controller: ${error.message}`);
        errorResponse.message =  "Failed to create airplane" ; 
        errorResponse.error = error.message ; 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};


export const getAirplanesController =  async (req , res)=>{
    try {
        const airplanes = await getAirplanesService() ; 
        successResponse.data = airplanes ; 
        return res.status(StatusCodes.OK).json(successResponse) ; 
    } catch (error) {
        logger.error("Failed to get all the airplanes ") ; 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error) ; 
    }
}

export const getAirplaneByIdController = async (req , res)=>{
    const id = req.params.id ; 
    if(!id || !isValidIdByMongoose(id)){
        errorResponse.message = "Correct Id is required" ; 
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse) ; 
    }
    try {
        const airplane = await getAirplaneByIdService(id) ; 
        if(!airplane){
            successResponse.data = {} ; 
            successResponse.message = "Please check the id" ; 
            return res.status(StatusCodes.NOT_FOUND).json(successResponse) ; 
        }
        successResponse.data  = airplane ; 
        successResponse.message = "Successfully fetched" ; 
        return res.status(StatusCodes.OK).json(successResponse); 
    } catch (error) {
        errorResponse.message = "Unable to fetch the airplne via id" ; 
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse) ; 
    }
}

export const deleteAirplaneByIdController = async (req , res)=>{
    const id = req.params.id ; 
    if(!id || !isValidIdByMongoose(id)){
        errorResponse.message = "Correct Id is required" ; 
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse) ; 
    }

    try {
        const response = await deleteAirplanesByIdService(id) ; 
        if(!response){
            successResponse.message = "Airplane not found"
            return res.status(StatusCodes.NO_CONTENT).json(successResponse) ; 
        }
        successResponse.message = "Sucessfully deleted" ; 
        successResponse.data = response ; 
        return res.status(StatusCodes.OK).json(successResponse) ; 
    } catch (error) {
        logger.error("Unable to delete the airplane in controllers") ; 
        errorResponse.message = error.message  ; 
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse) ; 
    }
}


export const updateAirplaneByIdController = async (req , res)=>{
    const id = req.params.id ; 
    const data = req.body ; 
    if(!id || !isValidIdByMongoose(id)){
        const response = {...errorResponse , message : "Correct Id is required"} ; 
        return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
    }
    if(!data || Object.keys(data).length == 0){
        const response = {...errorResponse , message : "Data is requried to update the field"} ; 
        return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
    }
    try {
        const updatedResult = await updateAirplaneByIdService(id , data) ;
        if(!updatedResult){
            const response = {...errorResponse , message : "Not able to find the airplane to update"} ; 
            return res.status(StatusCodes.NOT_FOUND).json(response) ; 
        }
        const response = {...successResponse , message : "Sucessfully updated the results" , data:updatedResult} ;
        return res.status(StatusCodes.OK).json(response) ; 
    } catch (error) {
        const response = {...errorResponse , message : `Server error on update Controller : ${error.message}`} ; 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response) ; 
    }
}