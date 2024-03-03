import {model,Schema} from "mongoose" 
export const Order = model('orders',new Schema({
    
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    
    
    status:{
        type:String,
        required:true,
        enum:['Processing','Confirmed','Shipping','Delivered','Cancelled'],
        default:'Processing',
    }
    

},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true,
}
))
//amanb