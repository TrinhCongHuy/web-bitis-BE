const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({  
    orderItems: [
        {
            name: String,
            amount: Number,
            image: String,
            price: Number,
            products: {
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
        fullName: String,
        address: String,
        city: String,
        phone: Number
    },
    paymentMethod: String,
    itemsPrice: Number,
    shippingPrice: Number,
    taxPrice: Number,
    totalPrice: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPaid: Boolean,
    paidAt: Date,
    isDelivered: Boolean,
    deliveredAt: Date
})


    
  

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;