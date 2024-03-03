import mongoose from "mongoose"
import { showError } from "../../lib/index.js"
import { Product } from "../../models/product.model.js"

class ProductsController{
    all = async (req,res,next)=>{
        try{
            const products = await Product.find({status:true}).exec()
            res.json(products)
        }catch(e){
            showError(e,next)
        }
    }

    latest = async (req,res,next)=>{
        try{
            const products = await Product.find({status:true})
            .sort({createdAt:'desc'}).exec()
            res.json(products)
        }catch(e){
            showError(e,next)
        }
    }

    topSelling = async (req,res,next)=>{
        try{
            const products = await Product.aggregate([
                {$match:{status:true}},
                {$lookup:{localField:'_id',foreignField:'product_id',from:'order_details',as:'order_details_count'}},
                {$addFields:{order_details_count:{$size:'$order_details_count'}}},
                
            ]).sort({order_details_count:'desc'}).exec()
            res.json(products)
        }catch(e){
            showError(e,next)
        }
    }

    show=async(req,res,next)=>{
        try{
            let product = await Product.aggregate([
                {$match:{status:true, _id: new mongoose.Types.ObjectId(req.params.id)}},
                {$lookup:{localField:'_id',foreignField:'product_id',from:'reviews',as:'reviews'}},
                {$lookup:{localField:'categoryId',foreignField:'_id',from:'categories',as:'category'}},
                {$lookup:{localField:'brandId',foreignField:'_id',from:'brands',as:'brand'}},
                
                
            ]).exec()
                product =product.pop()
                product.category =product.category.pop()
                product.brand =product.brand.pop()


            res.json(product)
        }catch(e){
            showError(e,next)
        }
    }

    byCategory = async (req,res,next)=>{
        try{
            const products = await Product.find({status:true, categoryId:req.params.id }).exec()
            res.json(products)
        }catch(e){
            showError(e,next)
        }
    }
    byBrand = async (req,res,next)=>{
        try{
            const products = await Product.find({status:true, brandId:req.params.id }).exec()
            res.json(products)
        }catch(e){
            showError(e,next)
        }
    }

    search = async (req,res,next) =>{
        try{
            const products = await Product.aggregate([
                {$match:{status:true, name:{$regex: req.query.term, $options: 'i'}}}
            ]).exec()
            res.json(products)
        }catch(e){
            showError(e,next)
        }
    }

}

export default new ProductsController