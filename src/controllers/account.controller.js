const AccountService = require('../service/AccountService')
const JwtService = require('../service/JwtService')


// [GET] /list-account
module.exports.listAccount = async (req, res) => {
    try {
        const response = await AccountService.listAccount()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /account/:id
module.exports.getAccount = async (req, res) => {
    try {
        const accountId = req.params.id
        const response = await AccountService.getAccount(accountId)
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
        const { name , email, password, phone, role_id } = req.body
        const avatar = req.file
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isCheckEmail = regex.test(email)
        if (!name || !email|| !password || !phone || !role_id) {
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

        const response = await AccountService.createAccount({
            name , email, password, phone, role_id,
            avatar: avatar.path
        })
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /sing-in
module.exports.loginAccount = async (req, res) => {
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

        const response = await AccountService.loginAccount(req.body)
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

// [PATCH] /update-account/:id
module.exports.updateAccount = async (req, res) => {
    try {
        const accountId = req.params.id
        const data = req.body
        
        if (!accountId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The accountId id required'
            })
        }

        const response = await AccountService.updateAccount(accountId, data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [DELETE] /delete-account/:id
module.exports.deleteAccount = async (req, res) => {
    try {
        const accountId = req.params.id
        
        if (!accountId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The accountId id required'
            })
        }

        const response = await AccountService.deleteAccount(accountId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [POST] /delete-many
module.exports.deleteManyAccount = async (req, res) => {
    try {
        const accountIds = req.body.ids
        
        if (!accountIds) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The accountId id required'
            })
        }

        const response = await AccountService.deleteManyAccount(accountIds)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /detail-account/:id
module.exports.detailAccount = async (req, res) => {
    try {
        const accountId = req.params.id
        
        if (!accountId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The accountId id required'
            })
        }

        const response = await AccountService.detailAccount(accountId)
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
module.exports.logoutAccount = async (req, res) => {
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