import { showError } from "../../lib/index.js"
import { Brand,} from "../../models/index.js"


class BrandsController{
    index= async(req,res,next)=>{
        try{
          const brands=await Brand.find()
          console.log(brands)
          res.json(brands)
        }catch(e){
            showError(e,next)
            }
    }
    store= async(req,res,next)=>{
        try{
            const {name,status}=req.body
            
            await Brand.create({name,status})
            res.status(201).json({
                sucess:'Brand Added.',
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
    show= async(req,res,next)=>{
        try{
            const brands = await Brand.findById(req.params.id)
            if (brands !=null){
                res.json(brands)
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
            const {name,status}=req.body
           
            await Brand.findByIdAndUpdate(req.params.id,{name,status,})
            res.json({
                sucess:'Brand Updated.',
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
            await Brand.findByIdAndDelete(req.params.id)
            res.json({
                sucess:'Brand removed.'
            })
        }catch(e){
            showError(e,next)
        }
    }
}
export default new BrandsController