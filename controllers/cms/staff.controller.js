import { showError } from "../../lib/index.js"
import { User } from "../../models/index.js"
import bcrypt from "bcryptjs/dist/bcrypt.js"

class StaffController{
    index= async(req,res,next)=>{
        try{
          const staffs=await User.find({type:'Staff'}).exec()
          console.log(staffs)
          res.json(staffs)
        }catch(e){
            showError(e,next)
            }
    }
    store= async(req,res,next)=>{
        try{
            const {name,email,password,phone,address,status}=req.body
            const hash =bcrypt.hashSync(password,bcrypt.genSaltSync(12))
            await User.create({name,email,password:hash,phone,address,status,type:'Staff'})
            res.status(201).json({
                sucess:'Staff Added.',
            })
        } catch(e){
            if(e.hasOwnProperty('errors')){
                let msg=''
                for(let k in e.errors){
                    msg +=e.errors[k].message
                }
                next({
                    message:msg,
                    status:422
                })
                }else if(e.hasOwnProperty('keyPattern')&& e.keyPattern.hasOwnProperty('email')){
                next({
                    message:'Email already exists',
                    status:422
                })
                }else{
                showError(e,next)
                }
            }
    }
    show= async(req,res,next)=>{
        try{
            const user = await User.findById(req.params.id)
            if (user !=null){
                res.json(user)
            }else{
                next({
                    message:'Data not found.',
                    status:404,
                })
            }
                
        } catch(e){
            next({
                message:'Data Not Found',
                status:404,
            })
        }
    }
    update= async(req,res,next)=>{
        try{
            const {name,phone,address,status}=req.body
           
            await User.findByIdAndUpdate(req.params.id,{name,phone,address,status,})
            res.json({
                sucess:'Staff Updated.',
            })
        } catch(e){
            if(e.hasOwnProperty('errors')){
                let msg=''
                for(let k in e.errors){
                    msg +=e.errors[k].message
                }
                next({
                    message:msg,
                    status:422
                })
                }else{
                showError(e,next)
                }
            }
    }
    destroy= async(req,res,next)=>{
        try{
            await User.findByIdAndDelete(req.params.id)
            res.json({
                sucess:'Staff removed.'
            })
        }catch(e){
            showError(e,next)
        }
    }
}
export default new StaffController