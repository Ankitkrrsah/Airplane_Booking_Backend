import { logger } from "../config/logger-config.js";
import { AirplaneRepository } from "../repositories/airplane-repositories.js";

const airplaneRepo = new AirplaneRepository();

export async function createAirplaneService(data) {
  try {
    const result = await airplaneRepo.create(data);
    logger.info(`Data sucessfully added from services : ${result}`);
    return result;
  } catch (error) {
    logger.error(`Error occured in services ${error.message}`);
    throw error;
  }
}

export async function getAirplanesService() {
  try {
    const airplanes = await airplaneRepo.getAll();
    return airplanes;
  } catch (error) {
    logger.error("Unable to fetch all the airplanes");
    throw error;
  }
}

export async function getAirplaneByIdService(id) {
  try {
    const result = await airplaneRepo.getById(id); 
    return result ; 
  } catch (error) {
    logger.error("Error Occured in services while getting the airplane") ; 
    throw error ; 
  }
}

export async function deleteAirplanesByIdService(id) {
  try {
    const result = await airplaneRepo.destroy(id); 
    return result ; 
  } catch (error) {
    logger.error("Error Occured in delete while getting the airplane") ; 
    throw error ; 
  }
}

export async function updateAirplaneByIdService(id , data) {
  try {
    const result = await airplaneRepo.update(id , data) ; 
    logger.info(`Done in services : ${JSON.stringify(result)}`)
    return result ;
  } catch (error) {
    logger.error(`Error Occured in update() on serice folder : ${error.message}`) ; 
    throw error ; 
  }
}

