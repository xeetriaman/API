import express from "express"
import {staffController} from "../../controllers/cms/index.js"

const router =express.Router()
router.route('/')
.get(staffController.index)
.post(staffController.store)

router.route('/:id')
.get(staffController.show)
.put(staffController.update)
.patch(staffController.update)
.delete(staffController.destroy)


export default router