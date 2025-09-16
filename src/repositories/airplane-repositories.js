import { CrudRepositories } from "./crud-repositories.js";
import { airplaneModel } from "../models/airplane-models.js";
import { logger } from "../config/logger-config.js";

export class AirplaneRepository extends CrudRepositories {
  constructor() {
    super(airplaneModel); 
  }

  async update(id, data) {
    const { modelNumber, capacity } = data ;

    try {
      // Check for duplicate modelNumber (excluding current doc)
      if (modelNumber) {
        const isAlreadyExists = await this.model.findOne({
          modelNumber,
          _id: { $ne: id },
        });
        if (isAlreadyExists) {
          logger.info(`Model number already exists`);
          return {};
        }
      }

      // Validate capacity
      if (!capacity || (capacity !== undefined &&(!Number.isFinite(capacity) || capacity < 0) )) {
        logger.info(`Invalid capacity`);
        return {};
      }

      const result = await this.model.findByIdAndUpdate(id, data, {
         new: true,
         strict: true,
         runValidators: true // optional but recommended
      } );

      logger.info(
        `Updated successfully in update(): ${JSON.stringify(result)}`
      );
      return result || {}; // return {} if nothing found
    } catch (error) {
      logger.error(`Error occurred in update(): ${error.message}`);
      throw error;
    }
  }

  
}
