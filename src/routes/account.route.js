const express = require('express')
const router = express.Router()

const controller = require('../controllers/account.controller')
const uploadCloud = require('../middleware/uploadToCloudinary')


router.post('/create-account', uploadCloud.single('avatar'), controller.createAccount)
router.post('/sing-in', controller.loginAccount)
router.post('/log-out', controller.logoutAccount)
router.patch('/update-account/:id', uploadCloud.single('avatar'), controller.updateAccount)
router.post('/refresh-token', controller.refreshToken)
router.post('/delete-many', controller.deleteManyAccount)


router.get('/list-account', controller.listAccount)
router.get('/account/:id', controller.getAccount)
router.delete('/delete-account/:id', controller.deleteAccount)
router.get('/detail-account/:id', controller.detailAccount)


module.exports = router