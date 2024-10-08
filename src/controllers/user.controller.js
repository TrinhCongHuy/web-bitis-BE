const UserService = require('../service/UserService')
const JwtService = require('../service/JwtService')


// [GET] /list-user
module.exports.listUser = async (req, res) => {
    try {
        const response = await UserService.listUser()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /totalUser
module.exports.totalUser = async (req, res) => {
    try {
        const response = await UserService.totalUser()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /user/:id
module.exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const response = await UserService.getUser(userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /sing-up
module.exports.createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isCheckEmail = regex.test(email)
        if (!name || !email|| !password|| !confirmPassword ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }

        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /sing-in
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isCheckEmail = regex.test(email)
        if ( !email|| !password ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require'
            })
        }else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }

        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newRepose } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true, // Ngăn JavaScript truy cập vào cookie, giảm thiểu nguy cơ bị đánh cắp qua XSS.
            secure: true, // Chỉ gửi cookie qua kết nối HTTPS để đảm bảo an toàn
            sameSite: 'strict' // Chỉ gửi cookie khi yêu cầu tới cùng một trang web
        });
        return res.status(200).json(newRepose)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// Login by Google
// [GET] /auth/login
module.exports.upsertUserSocialMedia = async (typeAcc, dataRaw) => {
    try {
        const response = await UserService.loginByGG(typeAcc, dataRaw);
        const { refresh_token, access_token, ...newResponse } = response;
        
        return {
            ...newResponse,
            access_token,
            refresh_token,
        };
    } catch (error) {
        return res.status(500).json({ status: 'ERROR', message: 'An error occurred during login.' });
    }
};

// [PATCH] /update-user/:id
module.exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, phone, password, confirmPassword } = req.body;
        const avatar = req.file;
        
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }

        if ((password && !confirmPassword) || (!password && confirmPassword)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Please provide both password and confirmPassword if one of them is provided'
            });
        }

        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (phone) updateFields.phone = phone;
        if (password) updateFields.password = password;
        if (confirmPassword) updateFields.confirmPassword = confirmPassword;
        if (avatar) updateFields.avatar = avatar.path;

        const response = await UserService.updateUser(userId, updateFields);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

// [PATCH] /update-address/:id
module.exports.updateAddressUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }

        const response = await UserService.updateAddressUser(userId, req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

// [DELETE] /delete-user/:id
module.exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId id required'
            })
        }

        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /delete-many
module.exports.deleteManyUser = async (req, res) => {
    try {
        const userIds = req.body.ids
        
        if (!userIds) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId id required'
            })
        }

        const response = await UserService.deleteManyUser(userIds)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /detail-user/:id
module.exports.detailUser = async (req, res) => {
    try {
        const userId = req.params.id
        
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId id required'
            })
        }

        const response = await UserService.detailUser(userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /refresh-token
module.exports.refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }

        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /log-out
module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        // localStorage.removeItem('access_token');
        return res.status(200).json({
            status: 'OK',
            message: 'Log out success'
        })
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /forgot-password/
module.exports.forgotPasswordPost = async (req, res) => {
    try {
        const data = req.body
        
        if (!data) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is require'
            })
        }

        const response = await UserService.forgotPasswordPost(data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}



// [POST] /forgot-password/
module.exports.otpPasswordPost = async (req, res) => {
    try {
        const data = req.body
        
        if (!data) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is require'
            })
        }

        const response = await UserService.otpPasswordPost(data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /reset-password/
module.exports.resetPasswordPost = async (req, res) => {
    try {
        const data = req.body
        
        if (!data) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is require'
            })
        }

        const response = await UserService.resetPasswordPost(data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}