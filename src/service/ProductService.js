const Product = require("../models/ProductModel")

// [POST] /create
module.exports.createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {name, image, type, price, countInStock, rating, description} = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })

            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already',
                })
            }else {
                const createProduct = await Product.create({
                    name, image, type, price, countInStock, rating, description
                })
                if (createProduct) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createProduct
                    })
                }
            }
        }catch(error) {
            reject(e)
        }
    })
}

// [PATCH] /update/:id
module.exports.updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
                deleted: false
            })
            if (!product) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                })
            }
            await Product.updateOne(
                {
                    _id: id
                },
                data
            )

            const newProduct = await Product.findOne({_id: id})

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newProduct
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [GET] /detail/:id
module.exports.detailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
                deleted: false
            })
            if (!product) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [PATCH] /delete/:id
module.exports.deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (!product) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                })
            }
            await Product.updateOne(
                {
                    _id: id
                },
                {
                    deleted: true
                }
            )

            resolve({
                status: 'OK',
                message: 'Delete is success'
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [GET] /
module.exports.listProduct = (page, limit, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            if (filter) {
                const label = filter[0]
                const productsFilter = await Product.find({ [label]: { '$regex': filter[1]} }).limit(limit).skip(page * limit)

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: productsFilter,
                    total: totalProduct,
                    pageCurrent: Number(page),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const productsSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: productsSort,
                    total: totalProduct,
                    pageCurrent: Number(page),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            
            const products = await Product.find().limit(limit).skip(page * limit);

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: products,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
            
        }catch(error) {
            reject(e)
        }
    })
}