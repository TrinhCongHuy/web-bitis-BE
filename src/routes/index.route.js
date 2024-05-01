const userRoute = require('./user.route')
const productRoute = require('./product.route')
const cartRoute = require('./cart.route')
const orderRoute = require('./order.route')
const paymentRoute = require('./payment.route')
const authRoute = require('./auth.route')
const topicRoute = require('./topic.route')
const postRoute = require('./post.route')
const accountRoute = require('./account.route')
const roleRoute = require('./role.route')







module.exports = (app) => {
    const version = "/api/v1"
    app.use(version + '/', userRoute)
    app.use(version + '/products', productRoute)
    app.use(version + '/carts', cartRoute)
    app.use(version + '/order', orderRoute)
    app.use(version + '/payment', paymentRoute)
    app.use(version + '/auth', authRoute)
    app.use(version + '/topics', topicRoute)
    app.use(version + '/posts', postRoute)
    app.use(version + '/account', accountRoute)
    app.use(version + '/role', roleRoute)


}