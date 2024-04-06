const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller')

router.post('/sing-up', controller.createUser)
router.post('/sing-in', controller.loginUser)
router.post('/log-out', controller.logoutUser)
router.patch('/update-user/:id', controller.updateUser)
router.post('/refresh-token', controller.refreshToken)


router.get('/list-user', controller.listUser)
router.delete('/delete-user/:id', controller.deleteUser)
router.get('/detail-user/:id', controller.detailUser)


module.exports = router
