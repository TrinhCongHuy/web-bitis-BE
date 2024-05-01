const OrderService = require('../service/OrderService')


// [POST] /create
module.exports.createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPay, user, deliveryMethod, isPaid, paidAt, email } = req.body;
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
            user,
            deliveryMethod,
            isPaid, 
            paidAt,
            email
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


// [GET] /listProductOrder
module.exports.listProductOrder = async (req, res) => {
    try {
        const userId = req.params.id
        const response = await OrderService.listProductOrder(userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [GET] /orderDetail
module.exports.orderDetail = async (req, res) => {
    try {
        const userId = req.params.id
        const response = await OrderService.orderDetail(userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


// [GET] /getAllOrder
module.exports.getAllOrder = async (req, res) => {
    try {
        const response = await OrderService.getAllOrder()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

// [DELETE] /deleteOrder/:id
module.exports.deleteOrder = async (req, res) => {
    try {
        const userId = req.params.id
        const response = await OrderService.deleteOrder(userId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}