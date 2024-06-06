const Category = require("../models/category-product")

// [POST] /create
module.exports.createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const {name} = newCategory
        try {
            const checkCategory = await Category.findOne({
                name: name
            })

            if (checkCategory !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of category is already',
                })
            }else {
                const createCategory = await Category.create({
                    name
                })
                if (createCategory) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createCategory
                    })
                }
            }
        }catch(error) {
            reject(error)
        }
    })
}

// [PATCH] /update/:id
module.exports.updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({
                _id: id
            })
            if (!category) {
                resolve({
                    status: 'OK',
                    message: 'The category is not defined',
                })
            }
            await Category.updateOne(
                {
                    _id: id
                },
                data
            )

            const newCategory = await Category.findOne({_id: id})

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newCategory
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [GET] /detail/:id
module.exports.detailCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({
                _id: id
            })
            if (!category) {
                resolve({
                    status: 'OK',
                    message: 'The category is not defined',
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: category
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [PATCH] /delete/:id
module.exports.deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({
                _id: id
            })
            if (!category) {
                resolve({
                    status: 'OK',
                    message: 'The category is not defined',
                })
            }
            await Category.deleteOne(
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
module.exports.deleteManyCategory = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Category.deleteMany(
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
module.exports.listCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await Category.find();

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: categories,
            })
            
        }catch(error) {
            reject(error)
        }
    })
}
