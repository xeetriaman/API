import {model,Schema} from "mongoose" 
export const Product = model('products',new Schema({
    name:{
        type:String,
        required:true,
    },
    summary:{
        type:String,
        required:true,  
    },
    description:{
        type:String,
        required:true,
    },

    price:{
        type:Number,
        required:true,
    },
    discounted_price:{
        type:Schema.Types.Mixed,
    },
   images:{
    type:[String],
    required:true,
   },
   categoryId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'categories'
   },
   brandId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'brands',
   },
   featured:{
    type:Boolean,
    required:true,
    default:false,
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
