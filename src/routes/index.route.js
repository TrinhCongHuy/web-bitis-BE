const userRoute = require('./user.route')
const productRoute = require('./product.route')
const cartRoute = require('./cart.route')
const orderRoute = require('./order.route')





module.exports = (app) => {
    const version = "/api/v1"
    app.use(version + '/', userRoute)
    app.use(version + '/products', productRoute)
    app.use(version + '/carts', cartRoute)
    app.use(version + '/order', orderRoute)

}