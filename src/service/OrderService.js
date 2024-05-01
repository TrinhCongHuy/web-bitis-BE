const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const sendMailHelper = require('../helpers/sendMail')




// [POST] /create
module.exports.createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPay, user, deliveryMethod, isPaid, paidAt, email } = newOrder;
        try {
            const createdOrder = await Order.create({ 
                orderItems,
                shippingAddress,
                paymentMethod, 
                shippingPrice, 
                totalPay,
                user,
                deliveryMethod,
                isPaid, 
                paidAt,
                email
            });

            const subject = "Bitis chân thanh cảm ơn quý khách!";
            let html = `
                <p>Chúc mừng bạn đã đặt hàng thành công!</p>
                <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Chúng tôi rất vui mừng được phục vụ bạn!</p>
                <p>Dưới đây là thông tin chi tiết về đơn hàng của bạn:</p>
                <ul>
                    <li><strong>Địa chỉ giao hàng:</strong> ${shippingAddress.specificLocation}, ${shippingAddress.address}</li>
                    <li><strong>Phương thức thanh toán:</strong> ${paymentMethod}</li>
                    <li><strong>Phí vận chuyển:</strong> ${shippingPrice} VNĐ</li>
                    <li><strong>Tổng thanh toán:</strong> ${totalPay} VNĐ</li>
                </ul>
                <p><strong>Sản phẩm trong đơn hàng:</strong></p>
                <ul>
            `;

            // Thêm thông tin sản phẩm vào email
            orderItems.forEach((item, index) => {
                html += `
                <li>
                    <p><strong>Sản phẩm ${index + 1}:</strong></p>
                    <p>Tên sản phẩm: ${item.name}</p>
                    <p>Số lượng: ${item.amount}</p>
                    <p>Giá tiền: ${item.price} VNĐ</p>
                </li>
                `;
            });

            html += `</ul>`;
                
            sendMailHelper.sendMail(email, subject, html)

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createdOrder
            });

        } catch (error) {
            reject(error);
        }
    });
};

// [GET] /listProductOrder
module.exports.listProductOrder = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orders = await Order.find({
                user: userId
            });

            if (orders) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: orders
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

// [GET] /orderDetail
module.exports.orderDetail = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDetail = await Order.findOne({
                _id: userId
            });

            if (orderDetail) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: orderDetail
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

// [DELETE] /deleteOrder/:id
module.exports.deleteOrder = async (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDetail = await Order.findOne({ _id: orderId });

            if (orderDetail) {
                for (const item of orderDetail.orderItems) {
                    const product = await Product.findOne({ _id: item?.product });

                    if (product) {
                        product.countInStock += item.amount;
                        product.sold -= item.amount;
                        await product.save();
                    }
                }

                await Order.deleteOne({ _id: orderId });

                resolve({
                    status: 'OK',
                    message: 'Đã xóa đơn hàng thành công',
                    data: orderDetail
                });
            } else {
                resolve({
                    status: 'ERROR',
                    message: 'Không tìm thấy đơn hàng'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

// [GET] /getAllOrder
module.exports.getAllOrder = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const orders = await Order.find();

            if (orders) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: orders
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