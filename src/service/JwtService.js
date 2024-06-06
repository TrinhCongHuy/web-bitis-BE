const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.generalAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    return access_token
}

module.exports.generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' });
    return refresh_token
}

module.exports.refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authentication '
                    })
                }
                const access_token = await this.generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                })
            })
            
        }catch(error) {
            reject(error)
        }
    })
}
