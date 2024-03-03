
import { showError } from "../../lib/index.js"
import { Product} from "../../models/index.js"
import {unlink} from "node:fs/promises";

class ProductsController{
    index= async(req,res,next)=>{
        try{
          const products=await Product.find()
          console.log(products)
          res.json(products)
        }catch(e){
            showError(e,next)
            }
    }
    store= async(req,res,next)=>{
        try{
            const {name,summary,description,price,discounted_price,categoryId,brandId,featured,status}=req.body
            
            const images = req.files.map(file => file.filename)
            await Product.create({name,summary,description,price,discounted_price:parseFloat(discounted_price),categoryId,brandId,featured,status,images})
            res.status(201).json({
                sucess:'Product Added.',
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
            const product = await Product.findById(req.params.id)
            console.log(product)
            if (product !=null){
                res.json(product)
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
            const product = await Product.findById(req.params.id)

            let images=product.images

            const {name,summary,description,price,discounted_price,categoryId,brandId,featured,status}=req.body

            if(typeof req.files !='undefined'){
                images = [...images, ...req.files.map(file => file.filename)]
            }
            
            
            await Product.findByIdAndUpdate(req.params.id,{name,summary,description,price,discounted_price:parseFloat(discounted_price),categoryId,brandId,featured,status,images})
            res.json({
                sucess:'Product Updated.',
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
            const product = await Product.findById(req.params.id)
            const images = product.images
            for(let image of images){
                await unlink(`images/${image}`)

            }
            await Product.findByIdAndDelete(req.params.id)
            res.json({
                sucess:'Product removed.'
            })
        }catch(e){
            showError(e,next)
        }
    }
    image = async (req,res,next) => {
            try{
                const product = await Product.findById(req.params.id)
                let images = product.images
                if (images.length>1){
                    images.splice(images.indexOf(req.params.filename),1)
                    await Product.findByIdAndUpdate(req.params.id,{images})
                    await unlink(`images/${req.params.filename}`)
                    res.json({
                        sucess:'Image removed.',
    
                    })
                }else{
                    next({
                        error:'Atleast one image is necessary.',
                        status:422,
                    })
                }
                
            }catch(e){
                showError(e,next)
            }
    }
}
export default new ProductsController