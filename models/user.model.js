import {model,Schema} from "mongoose" 

export const User = model('users',new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        maxlength:30,
        required:true,
    },
    address:{
    type:String,
    required:true,
    },
    type:{
        type:String,
        required:true,
        enum:['Customer','Staff','Admin'],
        default:'Customer'
    },
    status:{
        type:Boolean,
        required:true,
        default:true,
    }


}
,{
    timestamps:true,
    autoCreate:true,
    autoIndex:true,

}))

