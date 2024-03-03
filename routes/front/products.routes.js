import express from "express"
import { ProductsController } from "../../controllers/front/index.js";

const router= express.Router()

router.get ('/products',ProductsController.all)
router.get ('/products/latest',ProductsController.latest)
router.get ('/products/top-selling',ProductsController.topSelling)
router.get ('/products/:id',ProductsController.show)

export default router;