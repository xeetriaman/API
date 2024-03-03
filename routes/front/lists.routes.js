import express from "express"
import { ProductsController, listsController } from "../../controllers/front/index.js";

const router= express.Router()

router.get('/categories', listsController.categories)
router.get('/category/:id', listsController.categoryById)
router.get ('/category/:id/products',ProductsController.byCategory)

router.get('/brands', listsController.brands)
router.get('/brand/:id', listsController.brandById)
router.get ('/brand/:id/products',ProductsController.byBrand)

router.get('/search',ProductsController.search)

export default router;