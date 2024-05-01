const Account = require('../models/accountModel')
const bcrypt = require('bcrypt');
const { generalAccessToken , generalRefreshToken} = require('./JwtService')

// [GET] /list-account
module.exports.listAccount = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const listAccount = await Account.find({deleted: false})
            
            if (listAccount) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: listAccount
                })
            }  
        }catch(error) {
            reject(e)
        }
    })
}

// [GET] /account/:id
module.exports.getAccount = (accountId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const account = await Account.findOne({_id: accountId, deleted: false})
            
            if (account) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: account
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
        const { name , email, password, phone, role_id, avatar } = newAccount
        try {
            const existEmail = await Account.findOne({
                email: email
            })
            if (existEmail !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email already',
                })
            }

            const hash = bcrypt.hashSync(password, 10)

            const createAccount = await Account.create({
                name,
                email,
                password: hash,
                phone, 
                role_id,
                avatar,
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
module.exports.loginAccount = async (infoAccount) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = infoAccount
        try {
            const account = await Account.findOne({
                email: email,
                deleted: false
            });

            if (account === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The email is not defined',
                })
            }

            const passwordMatch = bcrypt.compareSync(password, account.password);
            if (!passwordMatch) {
                return resolve({
                    status: 'ERR',
                    message: 'The password or account is incorrect',
                });
            }
            
            // access_token
            const access_token = await generalAccessToken({
                id: account._id,
            })
            // refresh_token
            const refresh_token = await generalRefreshToken({
                id: account._id,
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
module.exports.updateAccount = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const account = await Account.findOne({
                _id: id
            })
            if (!account) {
                resolve({
                    status: 'ERR',
                    message: 'The account is not defined',
                })
            }
            await Account.updateOne(
                {
                    _id: id
                },
                data
            )

            const newAccount = await Account.findOne({_id: id})

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newAccount
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [DELETE] /delete-account/:id
module.exports.deleteAccount = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const account = await Account.findOne({
                _id: id,
            })
            if (!account) {
                resolve({
                    status: 'OK',
                    message: 'The account is not defined',
                })
            }
            await Account.updateOne(
                {
                    _id: id
                },
                {
                    deleted: true
                }
            )

            resolve({
                status: 'OK',
                message: 'Delete account is success'
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [DELETE] /delete-many
module.exports.deleteManyAccount = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Account.deleteMany(
                {
                    _id: ids 
                }
            )
            // await Account.updateMany(
            //     {
            //         _id: { $in: ids } 
            //     },
            //     {
            //         deleted: true
            //     }
            // )

            resolve({
                status: 'OK',
                message: 'Delete account is success'
            })
            
        }catch(error) {
            reject(e)
        }
    })
}

// [GET] /detail-account/:id
module.exports.detailAccount = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const account = await Account.findOne({
                _id: id,
                deleted: false
            }).select("-password")

            if (!account) {
                resolve({
                    status: 'OK',
                    message: 'The account is not defined',
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: account
            })
            
        }catch(error) {
            reject(e)
        }
    })
}