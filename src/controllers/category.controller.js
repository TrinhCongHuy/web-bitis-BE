const CategoryService = require('../service/CategoryService')


// [POST] /create
module.exports.createCategory = async (req, res) => {
    try {
        const {name} = req.body
        if ( !name ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }
        const response = await CategoryService.createCategory(req.body)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /update/:id
module.exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const data = req.body
        
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The categoryId id required'
            })
        }

        const response = await CategoryService.updateCategory(categoryId, data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /detail/:id
module.exports.detailCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The categoryId id required'
            })
        }

        const response = await CategoryService.detailCategory(categoryId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /delete/:id
module.exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The categoryId id required'
            })
        }

        const response = await CategoryService.deleteCategory(categoryId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /delete-many
module.exports.deleteManyCategory = async (req, res) => {
    try {
        const categoryIds = req.body.ids
        
        if (!categoryIds) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The categoryId id required'
            })
        }

        const response = await CategoryService.deleteManyCategory(categoryIds)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /
module.exports.listCategory = async (req, res) => {
    try {
        const response = await CategoryService.listCategory()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
