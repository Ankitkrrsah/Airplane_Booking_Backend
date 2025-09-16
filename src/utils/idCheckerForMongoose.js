import mongoose from "mongoose";

export const isValidIdByMongoose = (id)=>{
    return mongoose.Types.ObjectId.isValid(id) ; // it returns true or false 
}