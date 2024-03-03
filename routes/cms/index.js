import express from "express"
import staffRoutes from "./staffs.routes.js"
import customersRoutes from "./customers.routes.js"
import categoriesRoutes from "./categories.routes.js"
import brandsRoutes from "./brands.routes.js"
import productsRoutes from "./products.routes.js"

import { adminUser } from "../../lib/index.js"

const router=express.Router()

router.use('/staffs',adminUser, staffRoutes)

router.use('/customers', customersRoutes)

router.use('/categories', categoriesRoutes)

router.use('/brands', brandsRoutes)

router.use('/products', productsRoutes)




export default router
