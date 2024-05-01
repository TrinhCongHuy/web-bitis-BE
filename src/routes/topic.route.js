const express = require('express')
const router = express.Router()
const controller = require('../controllers/topic.controller')


router.post('/create', controller.createTopic)
router.patch('/update/:id', controller.updateTopic)
router.get('/detail/:id', controller.detailTopic)
router.delete('/delete/:id', controller.deleteTopic)
router.post('/delete-many', controller.deleteManyTopic)
router.get('/', controller.listTopic)




module.exports = router