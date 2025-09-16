import mongoose, { model, Schema } from "mongoose";

const airplaneSchema = new Schema({
    modelNumber : {
        type : String , 
        required : true , 
    } , 
    capacity : {
        type : Number , 
        default : 0 ,
    } ,
} , {timestamps : true})

export const airplaneModel = model('Airplane', airplaneSchema); 