const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    recipientName: String,
    phoneNumber: String,
    overallAddress: String,
    specificLocation: String,
    isDefault: {
        type: Boolean,
        default: false
    }
});

const userSchema = new mongoose.Schema({  
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone: String,
    avatar: String,
    address: [addressSchema],
    type: {
        type: String,
        default: "LOCAL"
    },
    access_token: String,
    refresh_token: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
  

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;