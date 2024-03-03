import express from "express"
import {categoriesController} from "../../controllers/cms/index.js"

const router =express.Router()
router.route('/')
.get(categoriesController.index)
.post(categoriesController.store)

router.route('/:id')
.get(categoriesController.show)
.put(categoriesController.update)
.patch(categoriesController.update)
.delete(categoriesController.destroy)


export default router