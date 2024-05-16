const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    id: String,
    body: String,
    username: String,
    userId: String,
    parentId: { type: String, default: null },
    createdAt: Date,
});

const productSchema = new mongoose.Schema({  
    name: String,
    images: [],
    type: String,
    price: Number,
    discount: Number,
    sizes: [{
        sizeType: Number, 
        quantity: Number,
    }],
    countInStock: Number,
    rating: Number,
    description: String,
    sold: Number,
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