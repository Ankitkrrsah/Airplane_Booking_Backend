import { StatusCodes } from "http-status-codes";
import { AirplaneRepository } from "../repositories/airplane-repositories.js";
import { errorResponse } from "../utils/common/success-error-response.js";
import { successResponse } from "../utils/common/success-error-response.js";

const airplaneRepo = new AirplaneRepository() ; 
export const validateCreateRequestMiddleware =async (req , res , next)=>{
    const {modelNumber} = req.body ; 
    if(!modelNumber){
        errorResponse.message = "Model number of the airplane is required" ; 
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse) ; 
        
    }
    const isModelNumberAlreadyExisits = await airplaneRepo.getAirplaneByModelNumber(modelNumber) ; 
    if(isModelNumberAlreadyExisits){
        errorResponse.message = "Model number already exitst " ;
        return res.status(StatusCodes.CONFLICT).json(errorResponse)
    }
    
    next() ; 
}