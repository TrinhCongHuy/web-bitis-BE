const express = require('express')
const router = express.Router()

const controller = require('../controllers/role.controller')


router.post('/create-role', controller.createRole)
router.patch('/update-role', controller.updateRole)
router.post('/delete-many', controller.deleteManyRole)


router.get('/list-role', controller.listRole)
router.get('/role/:id', controller.getRole)
router.delete('/delete-role/:id', controller.deleteRole)
router.get('/detail-role/:id', controller.detailRole)


module.exports = router