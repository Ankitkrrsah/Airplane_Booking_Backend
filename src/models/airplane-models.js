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

// internally mongoose does : SELECT * FROM seats WHERE airplaneId = airplane._id

// since it is a dynamic property means for every airplane the seats will be different 
// therefore it can't be hardcoded and we can't store statically 

airplaneSchema.virtual('seats' , {
    ref : 'Seat' , 
    localField : '_id' , 
    foreignField : 'airplaneId'
})

export const airplaneModel = model('Airplane', airplaneSchema); 