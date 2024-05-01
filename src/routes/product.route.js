const express = require('express')
const router = express.Router()

const controller = require('../controllers/product.controller')
const uploadCloud = require('../middleware/uploadToCloudinary')



router.post('/create', uploadCloud.single('image'), controller.createProduct)
router.patch('/update/:id', uploadCloud.single('image'), controller.updateProduct)
router.get('/detail/:id', controller.detailProduct)
router.delete('/delete/:id', controller.deleteProduct)
router.post('/delete-many', controller.deleteManyProduct)
router.get('/', controller.listProduct)
router.get('/type-product', controller.typeProduct)





module.exports = router