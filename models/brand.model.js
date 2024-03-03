import {model,Schema} from "mongoose" 
export const Brand  = model('brands',new Schema({
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
