import express from "express"
import {customersController} from "../../controllers/cms/index.js"

const router =express.Router()
router.route('/')
.get(customersController.index)
.post(customersController.store)

router.route('/:id')
.get(customersController.show)
.put(customersController.update)
.patch(customersController.update)
.delete(customersController.destroy)


export default router