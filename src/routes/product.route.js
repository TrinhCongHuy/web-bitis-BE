const express = require('express')
const router = express.Router()

const controller = require('../controllers/product.controller')
const uploadCloud = require('../middleware/uploadToCloudinary')


router.post('/create',
    uploadCloud.fields([{name: 'images[]', maxCount: 4}]), 
    controller.createProduct
)

router.patch('/update/:id', uploadCloud.fields([{name: 'images[]', maxCount: 4}]), controller.updateProduct)
router.post('/add-comment/:id', 
    uploadCloud.fields([{name: 'images[]', maxCount: 4}]),
    controller.addCommentProduct
)
router.get('/detail/:id', controller.detailProduct)
router.delete('/delete/:id', controller.deleteProduct)
router.post('/delete-many', controller.deleteManyProduct)
router.get('/', controller.listProduct)


module.exports = router