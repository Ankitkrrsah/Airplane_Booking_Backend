import { logger } from "../config/logger-config.js";
import { CityRepositories } from "../repositories/city-repositores.js";

const cityRepo = new CityRepositories();

export async function createCityService(data) {
  try {
    const result = await cityRepo.create(data);
    logger.info(`Data sucessfully added from services : ${result}`);
    return result;
  } catch (error) {
    logger.error(`Error occured in services while creating city ${error.message}`);
    throw error;
  }
}


export async function deleteCityByIdService(id) {
  try {
    if(!id) return {} ; 
    const city = await cityRepo.getById(id) ; 
    if(!city) return {} ; 
    const destoryedCity = await cityRepo.destroy(id) ; 
    logger.info(`Sucessfully deleted the city`) ;
    return destoryedCity ; 
  } catch (error) {
    logger.error(`Unable to delete the city using id : Failed at services`) ;
    throw error ; 
  }
}