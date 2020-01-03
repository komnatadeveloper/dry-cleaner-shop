const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Order = require("../../models/Order");
const UserActivity = require("../../models/UserActivity");

const authAdmin = require('../../middleware/authAdmin')

// Add a New Order
router.post('/', authAdmin, async ( req, res) => {

  try {
    // console.log(req.body);
    // console.log('REQ.BODY.USER', req.body.user);

    const {
      user,
      date,
      serviceList,
      orderStatus,
      orderTotalPrice
    } = req.body;

    // Check if there is that customer exists
    const customer = await User.findById(user);
    if( ! customer) {
      return res.status(400).json({ errors: [{ msg: "User does not exist!" }] })
    }
    // console.log('ADD ORDER: customer',  customer);

    const newOrder = new Order({
      user,
      serviceList,
      orderStatus,
      orderTotalPrice
    });

    await newOrder.save();

    customer.balance = customer.balance-orderTotalPrice
    await customer.save()

    console.log('Add New Order, newOrder ID', newOrder._id)

    // Save to User Activity
    const userActivity = new UserActivity({
      orderId: newOrder._id,
      customerId: customer._id,
      activityType: "order",
      amount: orderTotalPrice
    });
    await userActivity.save()    

    res.status(200).json({
      msg: "Order is added successfully",
      order: newOrder
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Update An Order Info
router.put('/:orderId', authAdmin, async ( req, res) => { 

  try {
    // Check if order exists & See its initial status
    const order = await Order.findById(req.params.orderId);

    const {
      user,
      serviceList,
      orderStatus,
      orderTotalPrice
    } = req.body;

    // Check if there is that NEW customer exists
    const customer = await User.findById(user);
    if (!customer) {
      return res.status(400).json({ errors: [{ msg: "User does not exist!" }] });
    }

    const initialTotal = order.orderTotalPrice; // to calculate new balance

    // Update Order Fields & Save To DB
    order.user = user._id;
    order.serviceList = serviceList;
    order.orderStatus = orderStatus;
    order.orderTotalPrice = orderTotalPrice;
    await order.save();

    // Calculate new balance of customer & Save
    customer.balance += initialTotal - orderTotalPrice;
    await customer.save();

    // Update User Activity Collection
    const userActivity = await UserActivity.findOne({
      orderId: order._id
    });

    userActivity.customerId = user._id;
    userActivity.amount = orderTotalPrice;
    await userActivity.save();

    res.status(200).json({
      msg: "Order is updated successfully",
      order
    });
  } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
  }
} )

// Get All Orders
router.get('/', authAdmin, async ( req, res) => { 

  try {

    const orderList = await Order.find( {})
      .populate('user', 'username')


    res.status(200).json(orderList);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
} )

// Get An Order Info - To Update
router.get('/:orderId', authAdmin, async ( req, res) => { 

  try {

    // Check if order exists
    const order = await Order.findById(req.params.orderId).populate(
      "user",
      "username"
    ).populate('serviceList.service', 'productName serviceType' );  // productName serviceType

    res.status(200).json(order)
    
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: "Order not found" }] })
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
} )





// Delete an Order
router.delete('/:orderId', authAdmin, async (req, res) => {
  try {
    // Check if order exists & Delete if Exists
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(400).json({ errors: [{ msg: "Order not found" }] });
    }
    await order.remove();


    // Delete Order from User Activities Collection
    await UserActivity.findOneAndRemove({
      orderId: order._id
    });

    // Calculate new balance of customer & Save
    const customer = await User.findById(order.customerId);
    customer.balance += order.orderTotalPrice;
    await customer.save();

    res.status(200).json({
      msg: "Order is deleted successfully",
      order
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

})




module.exports = router;
