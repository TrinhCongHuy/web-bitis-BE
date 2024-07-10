const ProductService = require('../service/ProductService')


// [POST] /create
module.exports.createProduct = async (req, res) => {
    try {
        const {name, type, price, sizes, rating, discount, description} = req.body
        const images = req.files['images[]'];

        if ( !name || !images || !type || !price || !sizes || !rating || !discount ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }

        // Tạo mảng chứa đường dẫn hình ảnh
        const imagePaths = images ? images.map(file => file.path) : [];

        const response = await ProductService.createProduct(
            {
                name, type, price, sizes, rating, discount, description,
                images: imagePaths
            }
        )
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PUT] /updateStatusProduct
module.exports.updateStatusProduct = async (req, res) => {
    try {
        const productId = req.params.id
        console.log(productId)
        const response = await ProductService.updateStatusProduct(productId)
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
        const images = req.files['images[]'];
        
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId id required'
            })
        }

        let response

        if (images) {
            const imagePaths = images ? images.map(file => file.path) : [];
            response = await ProductService.updateProduct(productId, {
                name, type, price, countInStock, rating, discount, description, images: imagePaths
            })
        }else {
            response = await ProductService.updateProduct(productId, req.body)
        }
        
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /add-comment/:id
module.exports.addCommentProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const {content, rating, userId} = req.body
        const images = req.files['images[]'];
        const imagePaths = images ? images.map(file => file.path) : [];

        const updateData = {
            content,
            rating,
            images: imagePaths,
            userId
        };
        
        const response = await ProductService.addCommentProduct(productId, updateData);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
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
        const {page, limit, sortKey, sortValue, filter} = req.query
        const response = await ProductService.listProduct(Number(page) || 0, Number(limit), sortKey, sortValue, filter)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /totalProduct
module.exports.totalProduct = async (req, res) => {
    try {
        const response = await ProductService.totalProduct()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}