const RoleService = require('../service/RoleService')
const JwtService = require('../service/JwtService')


// [GET] /list-role
module.exports.listRole = async (req, res) => {
    try {
        const response = await RoleService.listRole()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /role/:id
module.exports.getRole = async (req, res) => {
    try {
        const roleId = req.params.id
        const response = await RoleService.getRole(roleId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /create-role
module.exports.createRole = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title || !description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }

        const response = await RoleService.createRole({
            title , description
        })
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /update-role/:id
module.exports.updateRole = async (req, res) => {
    try {
        const data = req.body
        const response = await RoleService.updateRole(data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [DELETE] /delete-role/:id
module.exports.deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id
        
        if (!roleId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The roleId id required'
            })
        }

        const response = await RoleService.deleteRole(roleId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /delete-many
module.exports.deleteManyRole = async (req, res) => {
    try {
        const roleIds = req.body.ids
        
        if (!roleIds) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The roleId id required'
            })
        }

        const response = await RoleService.deleteManyRole(roleIds)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /detail-role/:id
module.exports.detailRole = async (req, res) => {
    try {
        const roleId = req.params.id
        
        if (!roleId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The roleId id required'
            })
        }

        const response = await RoleService.detailRole(roleId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
