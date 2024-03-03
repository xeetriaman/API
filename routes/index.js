import express from "express"
import authRoutes from "./auth/index.js"
import cmsRoutes from "./cms/index.js"
import frontRoutes from "./front/index.js"
import { auth, cmsUser } from "../lib/index.js"


const router= express.Router()
router.use('/auth',authRoutes)

router.use('/cms',auth,cmsUser,cmsRoutes)

router.get('/image/:filename',async(req,res,next)=>{
   res.sendFile(`images/${req.params.filename}`,{
         root: '../api'
      },err=>{
         next({
            message:'Image not Found',
            status:404,
         })
      })
})

router.use(frontRoutes)

router.use ((req, res,next)=>{
   next({
    message:'Resource not Found',
    status:404
   })
})
export default router;