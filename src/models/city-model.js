import mongoose from "mongoose";


const citySchema = mongoose.Schema({
    name :{
        type : String ,  
        required : true , 
        unique : true , 
    }
})

export const cityModel = mongoose.model("Cities" , citySchema) ; 