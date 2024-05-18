const express = require('express')
const router = express.Router()
const controller = require('../controllers/order.controller')

router.post('/create', controller.createOrder)
router.get('/listProductOrder/:id',  controller.listProductOrder)
router.get('/orderDetail/:id',  controller.orderDetail)
router.delete('/deleteOrder/:id',  controller.deleteOrder)
router.get('/getAllOrder',  controller.getAllOrder)



module.exports = router