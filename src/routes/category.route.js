const express = require('express')
const router = express.Router()
const controller = require('../controllers/category.controller')


router.post('/create', controller.createCategory)
router.patch('/update/:id', controller.updateCategory)
router.get('/detail/:id', controller.detailCategory)
router.delete('/delete/:id', controller.deleteCategory)
router.post('/delete-many', controller.deleteManyCategory)
router.get('/', controller.listCategory)




module.exports = router