const mongoose = require("mongoose");

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
    address: String,
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