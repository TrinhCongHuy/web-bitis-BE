const userRoute = require('./user.route')
const productRoute = require('./product.route')



module.exports = (app) => {
    const version = "/api/v1"
    app.use(version + '/', userRoute)
    app.use(version + '/products', productRoute)

}