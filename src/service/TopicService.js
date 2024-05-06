const Topic = require("../models/TopicModel")

// [POST] /create
module.exports.createTopic = (newTopic) => {
    return new Promise(async (resolve, reject) => {
        const {name} = newTopic
        try {
            const checkTopic = await Topic.findOne({
                name: name
            })

            if (checkTopic !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of topic is already',
                })
            }else {
                const createTopic = await Topic.create({
                    name
                })
                if (createTopic) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createTopic
                    })
                }
            }
        }catch(error) {
            reject(error)
        }
    })
}

// [PATCH] /update/:id
module.exports.updateTopic = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const topic = await Topic.findOne({
                _id: id
            })
            if (!topic) {
                resolve({
                    status: 'OK',
                    message: 'The topic is not defined',
                })
            }
            await Topic.updateOne(
                {
                    _id: id
                },
                data
            )

            const newTopic = await Topic.findOne({_id: id})

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newTopic
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [GET] /detail/:id
module.exports.detailTopic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const topic = await Topic.findOne({
                _id: id
            })
            if (!topic) {
                resolve({
                    status: 'OK',
                    message: 'The topic is not defined',
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: topic
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [PATCH] /delete/:id
module.exports.deleteTopic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const topic = await Topic.findOne({
                _id: id
            })
            if (!topic) {
                resolve({
                    status: 'OK',
                    message: 'The topic is not defined',
                })
            }
            await Topic.deleteOne(
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
module.exports.deleteManyTopic = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('ids', ids)
            await Topic.deleteMany(
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
module.exports.listTopic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const topics = await Topic.find();

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: topics,
            })
            
        }catch(error) {
            reject(error)
        }
    })
}
