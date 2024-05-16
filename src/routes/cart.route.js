const express = require('express')
const router = express.Router()
const controller = require('../controllers/cart.controller')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/addProduct', controller.createProductCart)
router.get('/listProductCart/:id', controller.listProductCart)
router.get('/countProductCart/:id', controller.countProductCart)
router.patch('/updateProductQuantity/:id', authMiddleware.authMiddleware , controller.updateProductQuantityInCart)
router.delete('/deleteProductCart/:id', authMiddleware.authMiddleware , controller.deleteProductInCart)
router.post('/delete-many', authMiddleware.authMiddleware , controller.deleteManyProductInCart)




module.exports = router