import { logger } from "../config/logger-config.js";


// don't have any update function here if want while exteding make your own inorder to coustmize it 
export class CrudRepositories {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const result = await this.model.create(data);
      await result.save();
      logger.info(`Data added successfully in create() crud`);
      return result;
    } catch (error) {
      logger.error(`Error occured in create() crud : ${error.message}`);
      throw error;
    }
  }

  async destroy(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      if (!result) {
        logger.warn(`No document found with id ${id} in destroy() crud`);
      } else {
        logger.info(`Data deleted successfully in destroy() crud`);
      }
      return result; // To check what was deleted
    } catch (error) {
      logger.error(`Error occured in destroy() crud : ${error.message}`);
      throw error;
    }
  }

  async getById(id) {
    try {
      const result = await this.model.findById(id);
      if (result) {
        logger.info(`Data accessed in get() : ${JSON.stringify(result)}`);
        return result;
      } else {
        logger.warn(`Data is not present in db `);
        return null ;
      }
    } catch (error) {
      console.log("Error");
      logger.error(
        `Invalid Id || Error occured in get() crud : ${error.message}`
      );
      throw error;
    }
  }
  async getAll() {
    try {
      const result = await this.model.find({});
      logger.info(`Data accessed in getAll() : ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      logger.error(`Error occured in getAll() crud : ${error.message}`);
      throw error;
    }
  }

}
  
