import { logger } from "../config/logger-config.js";

import { AirportRepositories } from "../repositories/airports-repositories.js";

const airportRepo = new AirportRepositories() ; 
export async function createAirportService (data){
    try {
        const result = await airportRepo.create(data);
        logger.info(`Data sucessfully added from services : ${result}`);
        return result;
      } catch (error) {
        logger.error(`Error occured in services ${error.message}`);
        throw error;
      }
}

export async function getAllAirportService() {
  try {
    const airports = await airportRepo.getAll();
    return airports;
  } catch (error) {
    logger.error(`Error occered in serviecs in getAirport: ${error.message}`);
    throw error;
  }
}


export async function getAirportByIdService(id) {
  try {
    const result = await airportRepo.getById(id); 
    return result ; 
  } catch (error) {
    logger.error(`Error occered in serviecs in getAirportById : ${error.message}`) ; 
    throw error ; 
  }
}

export async function deleteAirportByIdService(id) {
  try {
    const result = await airportRepo.destroy(id); 
    return result ; 
  } catch (error) {
    logger.error(`Error Occured in delete while getting the airport ${error.message}`) ; 
    throw error ; 
  }
}



export async function updateAirportByIdService(id , data) {
  try {
    const result = await airportRepo.update(id , data) ; 
    logger.info(`Done in services : ${JSON.stringify(result)}`)
    return result ;
  } catch (error) {
    logger.error(`Error Occured in update() on serice folder : ${error.message}`) ; 
    throw error ; 
  }
}




