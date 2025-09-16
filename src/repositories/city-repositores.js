import { CrudRepositories } from "./crud-repositories.js";
import { cityModel } from "../models/city-model.js";
import { logger } from "../config/logger-config.js";

export class CityRepositories extends CrudRepositories {
  constructor() {
    super(cityModel);
  }
}
