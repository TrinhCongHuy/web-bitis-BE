const express = require('express')
const router = express.Router()
const controller = require('../controllers/product.controller')


router.post('/create', controller.createProduct)
router.patch('/update/:id', controller.updateProduct)
router.get('/detail/:id', controller.detailProduct)
router.delete('/delete/:id', controller.deleteProduct)
router.get('/', controller.listProduct)




module.exports = router