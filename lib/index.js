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
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next({
                message: 'Authorization header is missing or malformed',
                status: 401,
            });
        }

        const token = authHeader.split(' ')[1];
        console.log(token);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified);

        const user = await User.findById(verified.userId);

        if (user != null) {
            if (user.status) {
                req.user = user;
                req.uid = user._id;
                next();
            } else {
                next({
                    message: 'Invalid Account',
                    status: 401,
                });
            }
        } else {
            next({
                message: 'Invalid Token',
                status: 401,
            });
        }
    } catch (e) {
        console.log(e);
        next({
            message: 'Invalid Token',
            status: 401,
        });
    }
};

/*export const auth = async (req, res, next) => {
    console.log('All headers:', req.headers);

    try {
      console.log('Headers:', req.headers); // Add this line to log the headers
      const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader) {
    console.log('Authorization header is missing. Available headers:', Object.keys(req.headers));
    return next({
      message: 'Authorization header missing',
      status: 401,
    });
  }
  
  
      const [bearer, token] = authHeader.split(' ');
      console.log('Bearer:', bearer); // Add this line
      console.log('Token:', token); // Add this line
      if (!token || bearer !== 'Bearer') {
        console.log('Invalid token format'); // Add this line
        return next({
          message: 'Invalid token format',
          status: 401,
        });
      }
      
      const verified = jwt.verify(token,process.env.JWT_SECRET, {
      });
      console.log('Verified payload:', verified); // Add this line
  
      const user = await User.findById(verified.data);
      
      if (user!=null) {
          if (user.status) {
              req.user = user;
              req.uid = user._id;
               next();
          } else {
               next({
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
      next({
          message: 'Invalid Token.',
          status: 401,
      });
  }
}; */

    

export const cmsUser =(req,res,next)=>{
    if(req.user.type ==='Admin' || req.user.type=== 'Staff') {
        next()
    }else{
      next({
        message:'Access Denied',
        status:403,
    })
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