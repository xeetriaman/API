import { showError } from "../../lib/index.js"
import { Category,} from "../../models/index.js"


class CategoriesController{
    index= async(req,res,next)=>{
        try{
          const categories=await Category.find()
          console.log(categories)
          res.json(categories)
        }catch(e){
            showError(e,next)
            }
    }
    store= async(req,res,next)=>{
        try{
            const {name,status}=req.body
            
            await Category.create({name,status})
            res.status(201).json({
                sucess:'Category Added.',
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
            const category = await Category.findById(req.params.id)
            if (category !=null){
                res.json(category)
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
           
            await Category.findByIdAndUpdate(req.params.id,{name,status,})
            res.json({
                sucess:'Category Updated.',
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
            await Category.findByIdAndDelete(req.params.id)
            res.json({
                sucess:'Category removed.'
            })
        }catch(e){
            showError(e,next)
        }
    }
}
export default new CategoriesController