import { CrudRepositories } from "./crud-repositories.js";
import { airportModel } from "../models/airport-model.js";
import { logger } from "../config/logger-config.js";

export class AirportRepositories extends CrudRepositories {
  constructor() {
    super(airportModel);
  }

  async update(id, data) {
    try {
        
      const airport = await this.getById(id) ;
      if (airport === null) {
        logger.warn(`No airport found with ID ${id} to update`);
        return null;
      }

      const result = await this.model.findByIdAndUpdate(
        id,
        data, // if we have some unwanted data it will not save since we haven't design any model for that 
        {
          new: true,              
          runValidators: true     // validate schema before update
        }
      );

      logger.info(`Airport updated: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      logger.error(`Error in update(): ${error.message}`);
      throw error;
    }
  }
}