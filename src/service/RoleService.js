const Role = require('../models/RoleModel')

// [GET] /list-role
module.exports.listRole = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const listRole = await Role.find({deleted: false})
            
            if (listRole) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: listRole
                })
            }  
        }catch(error) {
            reject(e)
        }
    })
}

// [GET] /role/:id
module.exports.getRole = (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await Role.findOne({_id: roleId, deleted: false})
            
            if (role) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: role
                })
            }  
        }catch(error) {
            reject(e)
        }
    })
}

// [POST] /create-role
module.exports.createRole = (newRole) => {
    return new Promise(async (resolve, reject) => {
        const { title , description } = newRole
        try {
            const createRole = await Role.create({
                title , description
            })
            if (createRole) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createRole
            })
                
            }
            
        }catch(error) {
            reject(e)
        }
    })
}

// [PATCH] /update-role
module.exports.updateRole = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const rolePermission of data) {
                const { id, permissions } = rolePermission;
                console.log('id, permissions', id, permissions)

                await Role.findOneAndUpdate(
                    { _id: id }, 
                    { permissions: permissions }
                );
            }

            const newRole = await Role.find()

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newRole
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [DELETE] /delete-role/:id
module.exports.deleteRole = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await Role.findOne({
                _id: id,
            })
            if (!role) {
                resolve({
                    status: 'OK',
                    message: 'The role is not defined',
                })
            }
            await Role.updateOne(
                {
                    _id: id
                },
                {
                    deleted: true
                }
            )

            resolve({
                status: 'OK',
                message: 'Delete role is success'
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [DELETE] /delete-many
module.exports.deleteManyRole = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Role.deleteMany(
                {
                    _id: ids 
                }
            )
            resolve({
                status: 'OK',
                message: 'Delete role is success'
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [GET] /detail-role/:id
module.exports.detailRole = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await Role.findOne({
                _id: id,
                deleted: false
            }).select("-password")

            if (!role) {
                resolve({
                    status: 'OK',
                    message: 'The role is not defined',
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: role
            })
            
        }catch(error) {
            reject(e)
        }
    })
}