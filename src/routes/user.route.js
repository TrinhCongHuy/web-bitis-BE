const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller')

router.post('/sing-up', controller.createUser)
router.post('/create-account', controller.createAccount)
router.post('/sing-in', controller.loginUser)
router.post('/log-out', controller.logoutUser)
router.patch('/update-user/:id', controller.updateUser)
router.post('/refresh-token', controller.refreshToken)
router.post('/delete-many', controller.deleteManyUser)



router.get('/list-user', controller.listUser)
router.get('/user/:id', controller.getUser)
router.get('/list-account', controller.listAccounts)
router.delete('/delete-user/:id', controller.deleteUser)
router.get('/detail-user/:id', controller.detailUser)


module.exports = router
