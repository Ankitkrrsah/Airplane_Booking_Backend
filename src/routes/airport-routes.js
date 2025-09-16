import express from "express" ; 
import { createAirportController , getAirportsController , getAirportByIdController ,deleteAirportByIdController , updateAirportByIdController } from "../controllers/airport-controllers.js";


const router = express.Router() ; 


router.post("/insertAirport" , createAirportController) ;
router.get("/getAllTheAirports" , getAirportsController) ;
router.post("/getAirport" , getAirportByIdController) ;
router.delete("/deletedAirportByID" , deleteAirportByIdController) ; 
router.patch("/updateAirportData" , updateAirportByIdController) ; 



export default router ; 