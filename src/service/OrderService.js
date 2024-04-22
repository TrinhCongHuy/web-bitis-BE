const Order = require('../models/OrderModel');



// [POST] /create
module.exports.createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPay, user } = newOrder;
        try {
            const createdOrder = await Order.create({ 
                orderItems,
                shippingAddress,
                paymentMethod, 
                shippingPrice, 
                totalPay,
                user 
            });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createdOrder
            });
        } catch (error) {
            reject(error);
        }
    });
};