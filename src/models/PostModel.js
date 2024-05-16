const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater')


const commentSchema = new mongoose.Schema({
    id: String,
    body: String,
    username: String,
    userId: String,
    parentId: { type: String, default: null },
    createdAt: Date,
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
    slug: { type: String, slug: "topic" },
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