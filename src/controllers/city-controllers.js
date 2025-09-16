import { StatusCodes } from "http-status-codes";
import { createCityService,deleteCityByIdService } from "../services/city-services.js";
import { errorResponse, successResponse } from "../utils/common/success-error-response.js";
import { isValidIdByMongoose } from "../utils/idCheckerForMongoose.js";
export const createCityController = async (req, res) => {
  const city = req.body;
  try {
    const createdCity = await createCityService(city) ; 
    if(!createdCity){
      
        const response = {...errorResponse , messsage : "Unable to create city"} ; 
        return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
    }
    const response = {...successResponse , message : "Successfully created the city" , data : createdCity} ; 
    return res.status(StatusCodes.OK).json(response) ; 
  } catch (error) {
    const response = {...errorResponse , messsage : `Unable to create city ${error.message}`} ; 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response) ; 
  }
};



export const deleteCityByIdControllers = async (req , res)=>{
  const {id} = req.params ; 
  if(!id || !isValidIdByMongoose(id)) {
    const response = {...errorResponse , message : `Correct id is requried` , data : {}} ; 
    return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
  }
  try {
    const deletedCity = await deleteCityByIdService(id) ; 
    if(!deletedCity){
      const response = {...errorResponse , message : `Unable to find the city` } ; 
      return res.status(StatusCodes.BAD_REQUEST).json(response) ; 
    }
    const response = {...successResponse , message : `Sucessfully deleted the city` , data : deletedCity} ; 
    return res.status(StatusCodes.OK).json(response)
  } catch (error) {
    const response = {...errorResponse , message : `$${error.message}` , data : error} ; 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response) ; 
  }
}






