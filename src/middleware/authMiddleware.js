const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }

        const userId = user.id;

        req.userId = userId;

        next()

        // if (payload.isAdmin) {
        //     next()
        // }else {
        //     return res.status(404).json({
        //         message: 'The authentication',
        //         status: 'ERROR'
        //     })
        // }
    });
}