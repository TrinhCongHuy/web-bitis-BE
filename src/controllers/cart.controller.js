const CartService = require('../service/CartService')


// [GET] /listProduct
module.exports.listProductCart = async (req, res) => {
    try {
        const userId = req.params.id
        const response = await CartService.listProductCart(userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


// [GET] /countProductCart
module.exports.countProductCart = async (req, res) => {
    try {
        const userId = req.params.id
        const response = await CartService.countProductCart(userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /addProduct
module.exports.createProductCart = async (req, res) => {
    try {
        const response = await CartService.createProductCart(req.body)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports.updateProductQuantityInCart = async (req, res) => {
    try {
        const productId = req.params.id
        const { quantity } = req.body;
        const { userId } = req;

        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId id required'
            })
        }

        const response = await CartService.updateProductQuantityInCart(productId, quantity, userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [delete] /delete/:id
module.exports.deleteProductInCart = async (req, res) => {
    try {
        const productId = req.params.id
        const { userId } = req;
        
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId id required'
            })
        }

        const response = await CartService.deleteProductInCart(productId, userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [delete] /delete-many
module.exports.deleteManyProductInCart = async (req, res) => {
    try {
        const { userId } = req;
        
        const response = await CartService.deleteManyProductInCart(req.body, userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}