const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

// [GET] /listProduct
module.exports.listProductCart = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({
                user_id: userId
            });

            if (cart) {
                const productsInCart = cart.products;

                const detailedProducts = [];

                for (const product of productsInCart) {
                    const productDetail = await Product.findById(product.product_id);

                    if (productDetail) {
                        detailedProducts.push({
                            _id: productDetail._id,
                            name: productDetail.name,
                            image: productDetail.image,
                            price: productDetail.price,
                            quantity: product.quantity,
                            discount: productDetail.discount
                        });
                    }
                }

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: detailedProducts
                });
            } else {
                resolve({
                    status: 'ERROR',
                    message: 'Cart not found for the user'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

// [POST] /addProduct
module.exports.createProductCart = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { user_id, product_id, quantity } = newProduct;
        try {
            let cart = await Cart.findOne({
                user_id: user_id
            });

            if (!cart) {
                cart = await Cart.create({ user_id });
            }

            const productExistInCart = cart.products.find(item => item.product_id === product_id);

            if (productExistInCart) {
                productExistInCart.quantity += quantity;
            } else {
                cart.products.push({ product_id, quantity });
            }

            await cart.save();

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: cart
            });
        } catch (error) {
            reject(error);
        }
    });
};

// [PATCH] /update/:id
module.exports.updateProductQuantityInCart = async (id, quantity, userId) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { user_id: userId, "products.product_id": id },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );

        if (!updatedCart) {
            return {
                status: 'ERR',
                message: 'Cart or product not found',
            };
        }

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: updatedCart
        };
    } catch (error) {
        throw error;
    }
};

// [DELETE] /delete/:id
module.exports.deleteProductInCart = async (id, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ user_id: userId });

            cart.products = cart.products.filter(product => product.product_id !== id);

            await cart.save();

            resolve({
                status: 'OK',
                message: 'Delete is success'
            });
        } catch(error) {
            reject(error);
        }
    });
};

// [DELETE] /delete-many
module.exports.deleteManyProductInCart = async (ids, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ user_id: userId });

            cart.products = cart.products.filter(product => !ids.includes(product.product_id));

            await cart.save();

            resolve({
                status: 'OK',
                message: 'Delete is success'
            });
        } catch(error) {
            reject(error);
        }
    });
};
