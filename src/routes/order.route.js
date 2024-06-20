const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");

router.post("/create", controller.createOrder);
router.get("/listProductOrder/:id", controller.listProductOrder);
router.get("/orderDetail/:id", controller.orderDetail);
router.delete("/deleteOrder/:id", controller.deleteOrder);
router.get("/getAllOrder", controller.getAllOrder);
router.put("/updateOrder/:id", controller.updateOrder);

// Tổng doanh thu hàng ngày
router.get("/daily-revenue", async (req, res) => {
  try {
    const dailyRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: {
            year: { $year: "$paidAt" },
            month: { $month: "$paidAt" },
            day: { $dayOfMonth: "$paidAt" },
          },
          totalRevenue: { $sum: "$orderItems.totalPrice" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    console.log('dailyRevenue', dailyRevenue)
    res.json(dailyRevenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tổng doanh thu hàng tháng
router.get("/monthly-revenue", async (req, res) => {
  try {
    const monthlyRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: { year: { $year: "$paidAt" }, month: { $month: "$paidAt" } },
          totalRevenue: { $sum: "$orderItems.totalPrice" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    res.json(monthlyRevenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
