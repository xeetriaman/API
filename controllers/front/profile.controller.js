import mongoose from "mongoose"
import { showError } from "../../lib/index.js"
import { Order, OrderDetail, Product, Review, User } from "../../models/index.js"
import bcrypt from "bcryptjs"

class ProfileController{
    details = async (req,res,next) =>{
        try{
            res.json(req.user)
        }catch(e){
            showError(e,next)
        }
    }
    reviews = async (req,res,next) =>{
        try{
            let reviews =await Review.aggregate([
                {$match:{'userId':new mongoose.Types.ObjectId(req.uid)}},
                {$lookup:{from:'products',localField:'productId',foreignField:'_id',as:
                'product'
            }}
            ]).exec()
            for(let i in reviews){
                    reviews[i].product=reviews[i].product.pop()
            }
        res.json(reviews)
        }catch(e){
            showError(e,next)
        }
    }

    addReview = async (req,res,next) =>{
        try{
            const {comment, rating}=req.body
            await Review.create({
                comment,rating,
                productId:req.params.id,
                userId:req.uid,
            })
            res.json({
                sucess:'Thank you for your review'
            })
        }catch{
            showError(e,next)
        }  
    }
    orders = async (req,res,next) =>{
        try{
            let orders = await Order.find({userId: req.uid}).exec();
            let list = []
            for (let order of orders){
                list.push({
                    _id:order._id,
                    userId:order.userId,
                    status:order.status,
                    createdAt:order.createdAt,
                    updatedAt:order.updatedAt,
                    __v:order.__v,
                    details:await this.getDetails(order)
                })
            }   
             res.json(list)      
        }catch(e){
            showError(e,next)
        }
    }

    getDetails = async(order)=> new Promise((resolve,reject)=>{
            OrderDetail.aggregate([
                {$match:{order_id:new mongoose.Types.ObjectId(order._id)}},
                {$lookup:{from:'products',localField:'product_id',foreignField:'id',as:'product'}}
            ]).exec()
          .then((details)=>{
            for (let dK in details){
                details[dk].product=details[dk].product.pop()
          }
            resolve(details)
        })
        .catch(err => reject(err))
    

    })
    addOrder = async (req,res,next) =>{
        try{
            const order = await Order.create({userId:req.uid})
            for(let item of req.body){
                const product =await Product.findById(item.product_id)
                const price = ['',null,undefined].includes(product.discounted_price) ?
                product.price:product.discounted_price
                
                await OrderDetail.create({
                    order_id:order._id,
                    product_id: product._id,
                    price,
                    qty:item.qty,
                    total:item.qty * price,
                })
            }
            res.json({
                success:'Thank you for your order.It is being processed.'
                })
        } catch(e){
            showError(e,next)
        }

    }

    update = async (req,res,next) =>{
        try{
            const {name,phone,address}=req.body
            await User.findByIdAndUpdate(req.uid,{name,phone,address})
            res.json({
                sucess:'Profile Updated.',
            })
        }catch(e){
            showError(e,next)
        }
        
    }
    password = async (req,res,next) =>{
        try{
            const {old_password, new_password} =req.body
            const user= req.user
            if (bcrypt.compareSync(old_password,user.password)){
                const hash =bcrypt.hashSync(new_password,bcrypt.genSaltSync(12))  
                await User.findByIdAndUpdate(req.uid,{password:hash})
                res.json({
                    success:'Password updated.'
                })  
            }else{
                next({
                    message:'The old password is incorrect',
                    status:422
                })
            }
        }catch(e){
            showError(e,next)
        }
        
    }
}

export default new ProfileController