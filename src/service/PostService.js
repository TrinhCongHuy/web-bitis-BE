const Post = require("../models/PostModel")

// [POST] /create
module.exports.createPost = (newPost) => {
    return new Promise(async (resolve, reject) => {
        const {title, topic,description, content, image} = newPost
        try {
            const createPost = await Post.create({
                title, topic, description, content, image
            })
            if (createPost) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createPost
                })
            }
        }catch(error) {
            reject(error)
        }
    })
}

// [PATCH] /update/:id
module.exports.updatePost = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await Post.findOne({
                _id: id
            })
            if (!post) {
                resolve({
                    status: 'OK',
                    message: 'The post is not defined',
                })
            }
            await Post.updateOne(
                {
                    _id: id
                },
                data
            )

            const newPost = await Post.findOne({_id: id})

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newPost
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [PATCH] /update-comment/:id
module.exports.updateCommentPost = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Post.findByIdAndUpdate(
                {_id: id},
                data
            );

            const newPost = await Post.findOne({_id: id})

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newPost
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [GET] /detail/:id
module.exports.detailPost = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await Post.findOne({
                _id: id
            })
            if (!post) {
                resolve({
                    status: 'OK',
                    message: 'The post is not defined',
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: post
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [PATCH] /delete/:id
module.exports.deletePost = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await Post.findOne({
                _id: id
            })
            if (!post) {
                resolve({
                    status: 'OK',
                    message: 'The post is not defined',
                })
            }
            await Post.deleteOne(
                {
                    _id: id
                }
            )

            resolve({
                status: 'OK',
                message: 'Delete is success'
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [PATCH] /delete-many
module.exports.deleteManyPost = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Post.deleteMany(
                {
                    _id: ids 
                }
            )

            resolve({
                status: 'OK',
                message: 'Delete is success'
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [GET] /
module.exports.listPost = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const posts = await Post.find().limit(limit);

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: posts,
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [GET] /topic/:slug
module.exports.listPostTopic = (slug) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('slug', slug)
            const posts = await Post.find({ slug: slug});

            console.log("posts", posts)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: posts,
            })
        }catch(error) {
            reject(error)
        }
    })
}

// [GET] /totalPost
module.exports.totalPost = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const total = await Post.countDocuments({deleted: false})

            resolve({
                status: 'OK',
                message: 'Success',
                data: total
            })
            
        }catch(error) {
            reject(error)
        }
    })
}
