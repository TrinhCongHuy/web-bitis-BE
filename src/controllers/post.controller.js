const PostService = require('../service/PostService')


// [POST] /create
module.exports.createPost = async (req, res) => {
    try {
        const {title, topic,description, content} = req.body
        const image = req.file;
        if ( !title, !topic, !description, !content, !image ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }
        const response = await PostService.createPost(
            {
                title,
                topic,
                description,
                content,
                image: image.path
            }
        )
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /update/:id
module.exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, topic, description, content } = req.body;
        const image = req.file;
        let updateFields = {};

        if (title) updateFields.title = title;
        if (topic) updateFields.topic = topic;
        if (description) updateFields.description = description;
        if (content) updateFields.content = content;
        if (req.file) updateFields.image = req.file.path;
        
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                status: 'ERR',
                message: 'No fields to update'
            });
        }

        const response = await PostService.updatePost(postId, updateFields);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

// [PATCH] /update-comment/:id
module.exports.updateCommentPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const response = await PostService.updateCommentPost(postId, req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}


// [GET] /detail/:id
module.exports.detailPost = async (req, res) => {
    try {
        const postId = req.params.id
        
        if (!postId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The postId id required'
            })
        }

        const response = await PostService.detailPost(postId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /delete/:id
module.exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        
        if (!postId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The postId id required'
            })
        }

        const response = await PostService.deletePost(postId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /delete-many
module.exports.deleteManyPost = async (req, res) => {
    try {
        const postIds = req.body.ids
        
        if (!postIds) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The postId id required'
            })
        }

        const response = await PostService.deleteManyPost(postIds)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /
module.exports.listPost = async (req, res) => {
    try {
        const {limit} = req.query
        const response = await PostService.listPost(Number(limit))
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
