const express = require('express')
const router = express.Router()


const controller = require('../controllers/coupon.controller')
const uploadCloud = require('../middleware/uploadToCloudinary')


router.post('/create-coupon',
    uploadCloud.single('image'),
    controller.createCoupon
)
router.put('/update-coupon/:id', 
    uploadCloud.single('image'), 
    controller.updateCoupon
)
// router.patch('/update-comment/:id', 
//     controller.updateCommentPost
// )
router.get('/detail-coupon/:id', controller.detailCoupon)
// router.delete('/delete/:id', controller.deletePost)
// router.post('/delete-many', controller.deleteManyPost)
router.get('/', controller.listCoupon)

module.exports = router