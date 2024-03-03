import { showError } from "../../lib/index.js"
import { Brand, Category } from "../../models/index.js"

class ListsController {
    categories =async (req,res,next) =>{
        try{
            const categories=await Category.find({status:true}).exec()
                res.json(categories)
        }catch(e){
            showError(e,next)
        }

    }

    
    categoryById =async (req,res,next) =>{
        try{
            const category=await Category.findOne({status:true,_id: req.params.id}).exec()
                res.json(category)
        }catch(e){
            showError(e,next)
        }

    }

    brands =async (req,res,next) =>{
        try{
            const brands=await Brand.find({status:true}).exec()
                res.json(brands)
        }catch(e){
            showError(e,next)
        }

    }

    

    brandById=async (req,res,next) =>{
        try{
            const brand=await Brand.findOne({status:true,_id: req.params.id}).exec()
                res.json(brand)
        }catch(e){
            showError(e,next)
        }


    }

}

export default new ListsController