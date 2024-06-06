const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: String,
    rating: Number,
    images: [],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: Date,
});

const productSchema = new mongoose.Schema({  
    name: String,
    images: [],
    type: String,
    price: Number,
    discount: Number,
    sizes: [{
        size: Number, 
        quantity: Number,
        sold: {
            type: Number,
            default: 0
        },
    }],
    rating: Number,
    description: String,
    brand: String,
    comments: [commentSchema],
    status: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
  

const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;