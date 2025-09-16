import express from "express" ; 
const app = express() ; 
import { PORT } from "./config/dotenv.js";
import { logger } from "./config/logger-config.js";
import { connectDB } from "./db/DatabaseConnect.js";
import airplaneRoutes from "./routes/airplane-routes.js";
import cityRoutes from "./routes/city-routes.js" ; 
import airportRoutes from "./routes/airport-routes.js" ;
import flightRoutes from "./routes/flight-routes.js"
connectDB() ;
app.use(express.json()) ; 
app.use(express.urlencoded({extended:true})) ; 

app.use("/api/v1/airplane" , airplaneRoutes) ; 
app.use("/api/v1/city" , cityRoutes) ; 
app.use("/api/v1/airport" , airportRoutes) ; 
app.use("/api/v1/flight" ,flightRoutes) ;   

app.listen(PORT , ()=>{
    logger.info(`Server running on port ${PORT}`);
})