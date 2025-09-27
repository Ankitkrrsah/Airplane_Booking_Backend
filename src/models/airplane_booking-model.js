import mongoose from "mongoose";
import { bookingStatus } from "../utils/common/enums.js";

const {BOOKED , PENDING , CANCLLED , INITIATED} = bookingStatus ; 
const bookingModel  = new mongoose.Schema({
    flightId : {
        type : String ,
        required : true 
    } , 
    userId : {
        type : Number , 
        required : true 
    } , 
    status : {
        type : String ,
        enum : [BOOKED , PENDING , CANCLLED , INITIATED] , 
        default : INITIATED , 
    } , 
    totalCost : {
        type : Number , 
    } , 
    numberOfSeats : {
        type : Number , 
        default : 1 , 
    }
})