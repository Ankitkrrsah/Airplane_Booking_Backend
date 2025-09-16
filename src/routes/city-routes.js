import express from "express";
import { createCityController , deleteCityByIdControllers} from "../controllers/city-controllers.js";

const router = express.Router();

/*
POST request 
api/v1/insertCity
*/
router.post("/insertCity" , createCityController) ; 
router.delete("/deleteCityById/:id" , deleteCityByIdControllers) ; 

export default router;