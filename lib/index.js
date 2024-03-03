import  jwt  from "jsonwebtoken"
import { User } from "../models/index.js";
import multer from "multer"




export const showError = (e, callback) => {
    console.log(e)
            callback({
                message:'Problem while processing request.',
                status:400,
            })
}

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified)
        const user = await User.findById(verified?.data);
        
        if (user) {
            if (user.status) {
                req.user = user;
                req.uid = user._id;
                return next();
            } else {
                return next({
                    message: 'Your account is inactive.',
                    status: 403,
                });
            }
        } else {
            return next({
                message: 'Invalid Token.',
                status: 401,
            });
        }
    } catch (error) {
        console.error('Authentication Error:', error);
        return next({
            message: 'Invalid Token.',
            status: 401,
        });
    }
};
    

export const cmsUser =(req,res,next)=>{
    if(req.user.type =='Customer'){
        next({
            message:'Access Denied',
            status:403,
        })
    }else{
        next()
    }
}

export const adminUser =(req,res,next)=>{
    if(req.user.type =='Admin'){
        next()
        
    }else{
        next({
            message:'Access Denied',
            status:403,
        })
    }
}

export const customerUser =(req,res,next)=>{
    if(req.user.type =='Customer'){
        next()
        
    }else{
        next({
            message:'Access Denied',
            status:403,
        })
    }
}

export const upload = () => multer({
    storage: multer.diskStorage({
        destination:function (req,file,cb){
            cb(null,'images')
        },
        filename:function (req,file,cb){
            const filename = `img${Date.now()}.${file.originalname.split('.').pop()}`
            cb(null,filename)
        },
    }),
    fileFilter:(req,file,cb) => {
        if (file.mimetype.startsWith('image/')){
            cb(null,true)
        }else{
            cb({message:'File type not supported'},false)
        }
    }

})