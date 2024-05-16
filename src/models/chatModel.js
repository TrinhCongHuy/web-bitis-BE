const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({  
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    message: String,
    images: Array,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
  

const Chat = mongoose.model('Chat', chatSchema, 'chats');
module.exports = Chat;