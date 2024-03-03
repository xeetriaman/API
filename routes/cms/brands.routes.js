import express from "express"
import {brandsController} from "../../controllers/cms/index.js"

const router =express.Router()
router.route('/')
.get(brandsController.index)
.post(brandsController.store)

router.route('/:id')
.get(brandsController.show)
.put(brandsController.update)
.patch(brandsController.update)
.delete(brandsController.destroy)


export default router