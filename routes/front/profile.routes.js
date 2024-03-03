import express from "express"
import { ProfileController } from "../../controllers/front/index.js"
import { customerUser } from "../../lib/index.js"

const router= express.Router()

router.route('/profile/edit')
.put(ProfileController.update)
.patch(ProfileController.update)


router.route('/password/edit')
.put(ProfileController.password)
.patch(ProfileController.password)

router.get('/profile/details',ProfileController.details)
router.get('/profile/reviews',customerUser,ProfileController.reviews)
router.get('/profile/orders',customerUser,ProfileController.orders)

router.post('/products/:id/review',customerUser,ProfileController.addReview)

router.post('/checkout',customerUser,ProfileController.addOrder)


export default router