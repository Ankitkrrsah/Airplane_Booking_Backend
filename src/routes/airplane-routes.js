import express from "express";
import {
  createAirplaneController,
  getAirplanesController,
  getAirplaneByIdController,
  deleteAirplaneByIdController,
  updateAirplaneByIdController,
} from "../controllers/airplane-controllers.js";
import { validateCreateRequestMiddleware } from "../middlewares/airplane-middleware.js";

const router = express.Router();
router.post(
  "/registerAirplane",
  validateCreateRequestMiddleware,
  createAirplaneController
);
router.get("/getAllAirplanes", getAirplanesController);
router.get("/getAirplane/:id", getAirplaneByIdController);
router.delete("/deleteAirplane/:id", deleteAirplaneByIdController);
router.patch("/updateAirplane/:id", updateAirplaneByIdController);
export default router;
