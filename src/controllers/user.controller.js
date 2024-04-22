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

// [GET] /list-account
module.exports.listAccounts = async (req, res) => {
    try {
        const response = await UserService.listAccounts()
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
        const { name , email, password, confirmPassword, phone } = req.body
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

// [POST] /create-account
module.exports.createAccount = async (req, res) => {
    try {
        const { name , email, password, avatar } = req.body
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isCheckEmail = regex.test(email)
        if (!name || !email|| !password ) {
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

        const response = await UserService.createAccount(req.body)
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
            httpOnly: true,
            secure: false, // Chỉ gửi cookie qua kết nối HTTPS để đảm bảo an toàn
            sameSite: 'strict' // Chỉ gửi cookie khi yêu cầu tới cùng một trang web
        });
        return res.status(200).json(newRepose)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [PATCH] /update-user/:id
module.exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId id required'
            })
        }

        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

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