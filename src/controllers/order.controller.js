const OrderService = require('../service//OrderService')


// [POST] /create
module.exports.createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPay, user } = req.body;
        if (!orderItems || !shippingAddress || !paymentMethod || !shippingPrice || !totalPay || !user) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Yêu cầu nhập đầy đủ thông tin'
            });
        }
        const { name, address, specificLocation, phone } = shippingAddress;
        if (!name || !address || !specificLocation || !phone) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thông tin địa chỉ giao hàng không đầy đủ'
            });
        }

        const orderData = {
            orderItems,
            shippingAddress: {
                name,
                address,
                specificLocation,
                phone
            },
            paymentMethod,
            shippingPrice,
            totalPay,
            user
        };

        const response = await OrderService.createOrder(orderData);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi tạo đơn hàng'
        });
    }
};