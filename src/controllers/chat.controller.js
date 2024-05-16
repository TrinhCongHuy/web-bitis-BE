const Chat = require('../models/chatModel');

// Controller để lấy tất cả các tin nhắn
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Chat.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để tạo một tin nhắn mới
exports.createMessage = async (req, res) => {
    const message = new Chat({
        sender: req.body.sender,
        recipient: req.body.recipient,
        message: req.body.message
    });

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
