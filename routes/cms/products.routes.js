import express from "express"
import {productsController} from "../../controllers/cms/index.js"
import multer from "multer"
import {upload} from "../../lib/index.js"

const router =express.Router()


router.route('/')
.get(productsController.index)
.post(upload().array('pics'),productsController.store)

router.route('/:id')
.get(productsController.show)
.put(upload().array('pics'),productsController.update)
.patch(upload().array('pics'),productsController.update)
.delete(productsController.destroy)

router.delete('/:id/image/:filename',productsController.image)

export default router