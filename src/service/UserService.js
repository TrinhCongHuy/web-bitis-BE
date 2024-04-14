const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { generalAccessToken , generalRefreshToken} = require('./JwtService')

// [GET] /list-user
module.exports.listUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const listUser = await User.find({isAdmin: false, deleted: false})
            
            if (listUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: listUser
                })
            }  
        }catch(error) {
            reject(e)
        }
    })
}

// [GET] /list-account
module.exports.listAccounts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const listAccounts = await User.find({isAdmin: true, deleted: false})
            
            if (listAccounts) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: listAccounts
                })
            }  
        }catch(error) {
            reject(e)
        }
    })
}

// [POST] /sing-up
module.exports.createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name , email, password, confirmPassword, phone } = newUser
        try {
            const existEmail = await User.findOne({
                email: email
            })
            if (existEmail !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email already',
                })
            }

            const hash = bcrypt.hashSync(password, 10)

            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
            })
                
            }
            
        }catch(error) {
            reject(e)
        }
    })
}

// [POST] /create-account
module.exports.createAccount = (newAccount) => {
    return new Promise(async (resolve, reject) => {
        const { name , email, password, avatar } = newAccount
        try {
            const existEmail = await User.findOne({
                email: email
            })
            if (existEmail !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email already',
                })
            }

            const hash = bcrypt.hashSync(password, 10)

            const createAccount = await User.create({
                name,
                email,
                password: hash,
                avatar,
                isAdmin: true
            })
            if (createAccount) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createAccount
            })
                
            }
            
        }catch(error) {
            reject(e)
        }
    })
}

// [POST] /sing-in
module.exports.loginUser = async (infoUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = infoUser
        try {
            const user = await User.findOne({
                email: email,
                deleted: false
            });

            if (user === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The email is not defined',
                })
            }

            const passwordMatch = bcrypt.compareSync(password, user.password);
            if (!passwordMatch) {
                return resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect',
                });
            }
            
            // access_token
            const access_token = await generalAccessToken({
                id: user._id,
                isAdmin: user.isAdmin
            })
            // refresh_token
            const refresh_token = await generalRefreshToken({
                id: user._id,
                isAdmin: user.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
            
        }catch(e) {
            reject(e)
        }
    })
}

// [PATCH] /update-user/:id
module.exports.updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                })
            }
            await User.updateOne(
                {
                    _id: id
                },
                data
            )

            const newUser = await User.findOne({_id: id})

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newUser
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [DELETE] /delete-user/:id
module.exports.deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            })
            if (!user) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                })
            }
            await User.updateOne(
                {
                    _id: id
                },
                {
                    deleted: true
                }
            )

            resolve({
                status: 'OK',
                message: 'Delete user is success'
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [DELETE] /delete-many
module.exports.deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany(
                {
                    _id: ids 
                }
            )
            // await User.updateMany(
            //     {
            //         _id: { $in: ids } 
            //     },
            //     {
            //         deleted: true
            //     }
            // )

            resolve({
                status: 'OK',
                message: 'Delete user is success'
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [GET] /detail-user/:id
module.exports.detailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
                deleted: false
            }).select("-password")

            if (!user) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
            
        }catch(error) {
            reject(e)
        }
    })
}