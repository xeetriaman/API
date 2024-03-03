import {model,Schema} from "mongoose" 
export const Category  = model('categories',new Schema({
    name:{
        type:String,
        required:true,
    },
   
    status:{
        type:Boolean,
        required:true,
        default:true,
    }

},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true,
}
))
