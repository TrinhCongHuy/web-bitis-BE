const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller')
const uploadCloud = require('../middleware/uploadToCloudinary')

router.post('/sing-up', controller.createUser)
router.post('/sing-in', controller.loginUser)
router.post('/log-out', controller.logoutUser)
router.patch('/update-user/:id', uploadCloud.single('avatar'), controller.updateUser)
router.patch('/update-address/:id', controller.updateAddressUser)
router.post('/refresh-token', controller.refreshToken)
router.post('/delete-many', controller.deleteManyUser)

router.post('/forgot-password', controller.forgotPasswordPost)
router.post('/otp-password', controller.otpPasswordPost)
router.post('/reset-password', controller.resetPasswordPost)



router.get('/list-user', controller.listUser)
router.get('/user/:id', controller.getUser)
router.delete('/delete-user/:id', controller.deleteUser)
router.get('/detail-user/:id', controller.detailUser)
router.get('/totalUser', controller.totalUser)



module.exports = router
