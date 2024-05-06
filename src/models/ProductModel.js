const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({  
    name: String,
    image: String,
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