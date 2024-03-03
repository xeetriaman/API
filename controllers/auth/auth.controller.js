import bcrypt from "bcryptjs/dist/bcrypt.js"
import jwt from "jsonwebtoken"
import {User} from "../../models/index.js"    
import { showError } from "../../lib/index.js"

class Authcontroller{
   
    register = async (req,res,next)=>{
        try{
            const {name,email,password,phone,address}=req.body
            const hash =bcrypt.hashSync(password,bcrypt.genSaltSync(12))
            await User.create({name,email,password:hash,phone,address})
            res.status(201).json({
                sucess:'Thank you for registering with us.',
            })
        }catch(e){
            showError(e,next)
        }

    }
    
    login= async (req,res,next)=>{
        try{
            const{email,password}=req.body
            const user = await User.findOne({email}).exec()
                if (user!=null){
                  if(bcrypt.compareSync(password,user.password)){
                    const token =jwt.sign({
                        data:user._id,
                        iat:Math.floor(Date.now()/1000),
                        exp:Math.floor(Date.now()/1000+30*24*60*60),

                    },process.env.JWT_SECRET)
                    res.json({token,user})
                  }else{
                    next({
                        message:'The password is incorrect',
                        status:404
                    })
                  }
                }else{
                    next({
                        message:'The email is not registered',
                        status:404
                    })
                }
	    }catch(e){
            showError(e,next)
        }
    }
}
export default new Authcontroller