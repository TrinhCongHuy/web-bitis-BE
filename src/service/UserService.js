const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const ForgotPassword = require('../models/forgot-password');
const generate = require('../helpers/generate')
const sendMailHelper = require('../helpers/sendMail')
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
            reject(error)
        }
    })
}

// [GET] /user/:id
module.exports.getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({_id: userId, deleted: false})
            
            if (user) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: user
                })
            }  
        }catch(error) {
            reject(error)
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
            reject(error)
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
            
        }catch(error) {
            reject(error)
        }
    })
}

// Login by Google
module.exports.loginByGG = async (typeAcc, dataRaw) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne(
                {
                    email: dataRaw.email,
                    type: typeAcc
                }
            )
            if (!user) {
                user = new User({
                    name: dataRaw.fullName,
                    email: dataRaw.email,
                    type: typeAcc,
                    avatar: dataRaw.avatar,
                })
                await user.save()
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
            
        }catch(error) {
            reject(error)
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
            reject(error)
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
            reject(error)
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
            reject(error)
        }
    })
}


// [POST] /forgot-password
module.exports.forgotPasswordPost = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { email } = data
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

            const otp = generate.generateRandomNumber(6)

            const objectForgotPassword = {
                email: email,
                otp: otp,
                expireAt: Date.now()
            }
            
            const forgotPassword = new ForgotPassword(objectForgotPassword)
            await forgotPassword.save()

            const subject = "Mã OTP xác minh lấy lại mật khẩu!"
            const html = `Mã OTP lấy lại mật khẩu là ${otp}. Thời hạn sử dụng là 3 phút. Lưu ý: Không để lộ mã OTP.`

            sendMailHelper.sendMail(email, subject, html)


            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
            
        }catch(error) {
            reject(error)
        }
    })
}

// [POST] /otp-password
module.exports.otpPasswordPost = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { email, otp } = data
        try {
            const accuracyOtp = await ForgotPassword.findOne({
                email: email,
                otp: otp
            });

            if (accuracyOtp === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The otp is not defined',
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
            
        }catch(error) {
            reject(error)
        }
    })
}


// [POST] /otp-password
module.exports.resetPasswordPost = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { email, password, confirmPassword } = data

        if (password != confirmPassword) {
            res.redirect("back")
            return;
        }

        try {
            const hash = bcrypt.hashSync(password, 10)

            await User.updateOne(
                {
                    email: email,
                    deleted: false
                }, 
                {
                    password: hash
                }
            )

            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
            
        }catch(error) {
            reject(error)
        }
    })
}
