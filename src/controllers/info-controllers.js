import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger-config.js";
import { errorResponse } from "../utils/common/success-error-response.js";
import { successResponse } from "../utils/common/success-error-response.js";


const info = (req,res)=>{
    logger.info("Hii") ; 
    successResponse.message = "Server is running fine" ;
    return res.status(StatusCodes.OK).json(successResponse)
}

export default info ; 