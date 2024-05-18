const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({  
    code: String,
    discount: Number,
    count: Number,
    image: String,
    description: String,
    usedCount: {
        type: Number,
        default: 0
    },
    expireAt: { 
        type: Date,
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
  

const Coupon = mongoose.model('Coupon', couponSchema, 'coupons');
module.exports = Coupon;