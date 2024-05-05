const express = require('express')
const router = express.Router()


const controller = require('../controllers/post.controller')
const uploadCloud = require('../middleware/uploadToCloudinary')


router.post('/create',
    uploadCloud.single('image'),
    controller.createPost
)
router.patch('/update/:id', 
    uploadCloud.single('image'), 
    controller.updatePost
)
router.patch('/update-comment/:id', 
    controller.updateCommentPost
)
router.get('/detail/:id', controller.detailPost)
router.delete('/delete/:id', controller.deletePost)
router.post('/delete-many', controller.deleteManyPost)
router.get('/', controller.listPost)




module.exports = router