const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: Date,
});

const postSchema = new mongoose.Schema({  
    title: String,
    content: String,
    description: String,
    topic: String,
    tags: [String],
    likes: {
        type: Number,
        default: 0
    },
    image: String,
    comments: [commentSchema],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
  

const Post = mongoose.model('Post', postSchema, 'posts');
module.exports = Post;