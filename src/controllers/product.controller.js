const ProductService = require('../service/ProductService')


// [POST] /create
module.exports.createProduct = async (req, res) => {
    try {
        const {name, type, price, countInStock, rating, discount, description} = req.body
        const image = req.file;
        if ( !name || !image || !type || !price || !countInStock || !rating || !discount ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }
        const response = await ProductService.createProduct(
            {
                name, type, price, countInStock, rating, discount, description,
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
module.exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const {name, type, price, countInStock, rating, discount, description} = req.body
        const image = req.file;
        
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId id required'
            })
        }

        const response = await ProductService.updateProduct(productId, {
            name, type, price, countInStock, rating, discount, description, image: image.path
        })
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /detail/:id
module.exports.detailProduct = async (req, res) => {
    try {
        const productId = req.params.id
        
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId id required'
            })
        }

        const response = await ProductService.detailProduct(productId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /delete/:id
module.exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId id required'
            })
        }

        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /delete-many
module.exports.deleteManyProduct = async (req, res) => {
    try {
        const productIds = req.body.ids
        console.log('productIds', productIds)
        
        if (!productIds) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId id required'
            })
        }

        const response = await ProductService.deleteManyProduct(productIds)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /
module.exports.listProduct = async (req, res) => {
    try {
        const {page, limit, sort, filter} = req.query
        const response = await ProductService.listProduct(Number(page) || 0, Number(limit) || 8, sort, filter)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /type-product
module.exports.typeProduct = async (req, res) => {
    try {
        const response = await ProductService.typeProduct()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}