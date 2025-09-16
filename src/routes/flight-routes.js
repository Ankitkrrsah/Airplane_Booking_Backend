import express from "express";
import { createFlightController, getAllFlightsController } from "../controllers/flight-controllers.js";
const router = express.Router();

// api/v1/flight/createFlight ? trip=MUM-DEL 
router.post("/createFlight" , createFlightController) ;
router.get("/getAllFlights" , getAllFlightsController) ;


export default router;