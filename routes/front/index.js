import productsRoutes from "./products.routes.js"
import listsRoutes from "./lists.routes.js"
import profileRoutes from "./profile.routes.js"
import { auth } from "../../lib/index.js"

import express from "express"

const router= express.Router()

router.use(productsRoutes)
router.use(listsRoutes)
router.use(auth,profileRoutes)

export default router