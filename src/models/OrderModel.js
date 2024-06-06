const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({  
    orderItems: [
        {
            name: String,
            amount: Number,
            discount: Number,
            image: String,
            size: Number,
            price: Number,
            quantity: Number,
            totalPrice: Number,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            deleted: {
                type: Boolean,
                default: false
            },
            deletedAt: Date
        }, {
                timestamps: true
        }
    ],
    shippingAddress: {
        name: String,
        address: String,
        specificLocation: String,
        phone: Number
    },
    paymentMethod: String,
    shippingPrice: Number,
    totalPay: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPaid: Boolean,
    paidAt: Date,
    status: {
        type: String,
        default: 'Chờ xác nhận'
    },
    deliveryMethod: String,
    isDelivered: Boolean,
    deliveredAt: Date
})


    
  

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;