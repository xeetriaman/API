import {model,Schema} from "mongoose" 
export const Review = model('reviews',new Schema({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,  
        min:1,
        max:5,
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    productId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'products',
    },
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true,
}
))
