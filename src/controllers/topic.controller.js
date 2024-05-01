const TopicService = require('../service/TopicService')


// [POST] /create
module.exports.createTopic = async (req, res) => {
    try {
        const {name} = req.body
        console.log('name', name)
        if ( !name ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }
        const response = await TopicService.createTopic(req.body)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /update/:id
module.exports.updateTopic = async (req, res) => {
    try {
        const topicId = req.params.id
        const data = req.body
        
        if (!topicId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The topicId id required'
            })
        }

        const response = await TopicService.updateTopic(topicId, data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /detail/:id
module.exports.detailTopic = async (req, res) => {
    try {
        const topicId = req.params.id
        
        if (!topicId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The topicId id required'
            })
        }

        const response = await TopicService.detailTopic(topicId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /delete/:id
module.exports.deleteTopic = async (req, res) => {
    try {
        const topicId = req.params.id
        
        if (!topicId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The topicId id required'
            })
        }

        const response = await TopicService.deleteTopic(topicId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /delete-many
module.exports.deleteManyTopic = async (req, res) => {
    try {
        const topicIds = req.body.ids
        console.log('topicIds', topicIds)
        
        if (!topicIds) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The topicId id required'
            })
        }

        const response = await TopicService.deleteManyTopic(topicIds)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /
module.exports.listTopic = async (req, res) => {
    try {
        const response = await TopicService.listTopic()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
