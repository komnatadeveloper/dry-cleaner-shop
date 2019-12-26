const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Order = require("../../models/Order");
const UserActivity = require("../../models/UserActivity");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')

// Register a new User
router.post('/register', async (req, res) => {
  
  try {
    const {
      username,
      email,
      password,
      name,
      middleName,
      surName,
      tel1,
      tel2,
      address
    } = req.body;
  
    const newUser = new User({
      username,
      email,
      password,
      name,
      middleName,
      surName,
      tel1,
      tel2,
      address,
      balance: 0.00
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt)

    await newUser.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: newUser.id,
        type: 'user'
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({ token })
      }
    )
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Add a New Order
router.post('/orders', auth, async (req, res) => {

  try {

    const customerId = req.user.id

    const {
      // customerId,  DISABLED
      // date,        DISABLED
      serviceList,
      orderStatus,
      orderTotalPrice
    } = req.body;

    // Check if there is that customer exists
    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status().json('User does not exist')
    }

    const newOrder = new Order({
      customerId,
      serviceList,
      orderStatus,
      orderTotalPrice
    });

    await newOrder.save();

    customer.balance = customer.balance - orderTotalPrice
    await customer.save()

    // Save to User Activity
    const userActivity = new UserActivity({
      customerId: customer._id,
      activityType: "order",
      amount: orderTotalPrice
    });
    await userActivity.save()

    res.status(200).json(newOrder)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// Get All Orders
router.get('/orders', auth, async (req, res) => { 

  try {

    const orderList = await Order.find( {customerId: req.user.id});
    
    res.status(200).json(orderList)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
} )


// Get A Single Order
router.get('/orders/:orderId', auth, async (req, res) => { 

  try {
    const order = await Order.findById( req.params.orderId);
    if( !order || order.customerId !== req.user.id ) {
      return res.status(400).send('Order Not Found')
    }
    
    res.status(200).json(order)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
} )


// Update an Order
router.put('/orders/:orderId', auth, async (req, res) => { 

  try {
    const order = await Order.findById( req.params.orderId);
    if (!order || order.customerId !== req.user.id ) {
      return res.status(400).send('Order Not Found')
    }
    
    const { 
      // customerId, DISABLED
      serviceList, 
      // orderStatus, DISABLED
      orderTotalPrice 
    } = req.body;

    // order.customerId = customerId;
    order.serviceList = serviceList;
    // order.orderStatus = orderStatus;
    order.orderTotalPrice = orderTotalPrice;

    await order.save();

    res.status(200).json(order);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
} )



module.exports = router;
