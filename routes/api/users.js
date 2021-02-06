const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Order = require("../../models/Order");
const Service = require("../../models/Service");
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

        res.status(200).json({ token, userType: 'user' })
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

    const user = req.user.id
    
    const {
      // customerId,  DISABLED
      // date,        DISABLED
      serviceList,
    } = req.body;

    // Check if there is that customer exists
    const customer = await User.findById(user);
    if (!customer) {
      return res.status().json('User does not exist')
    }

    // Add In Progress to All Service List
    serviceList.map( service => {
      service.unitServiceStatus = "In Progress"
    })
    // Add Order Status as In Progress
    const orderStatus = "In Progress"

    // Iterate and create serviceList search array
    const serviceQuery = serviceList.map( service => (
      {_id: service.service}
    ) )
    const serviceListFromDB = await Service.find( {
      $or: [ ...serviceQuery ]        
    }).populate('serviceList.service', 'productName serviceType')
    // console.log(serviceListFromDB);    

    let orderTotalPrice = 0
    serviceList.map( service => {
      // console.log('SERVICE LIST', serviceListFromDB);
      const relatedService = serviceListFromDB.filter(item => item._id.toString() === service.service.toString())

      if(!relatedService[0]) return res.json('SERVICE NOT FoUnD')
      service.unitPrice = relatedService[0].servicePrice;
      service.unitTotalPrice = service.quantity * relatedService[0].servicePrice;
      orderTotalPrice += service.unitTotalPrice
    })




    const newOrder = new Order({
      user,
      serviceList,
      orderStatus,
      orderTotalPrice
    });

    await newOrder.save()
    // console.log('NEW ORDER', newOrder);
    // console.log('SERVICE LIST', serviceList);

    customer.balance = customer.balance - orderTotalPrice
    await customer.save()

    // Save to User Activity
    const userActivity = new UserActivity({
      customerId: customer._id,
      activityType: "order",
      amount: orderTotalPrice,
      orderId: newOrder._id
    });
    await userActivity.save()

    res.status(200).json({
      msg: 'Order successfully added',
      order: {
        _id: newOrder._id,
        user: newOrder.user,
        serviceList,
        orderStatus,
        date: newOrder.date
      }})

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// Get All Orders
router.get('/orders', auth, async (req, res) => { 

  try {

    const orderList = await Order.find({ user: req.user.id }).populate('serviceList.service', 'productName serviceType');
    
    res.status(200).json(orderList)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
} )


// Get A Single Order
router.get('/orders/:orderId', auth, async (req, res) => { 

  try {
    const order = await Order.findById(req.params.orderId).populate('serviceList.service', 'serviceName category');

    if( !order || order.user.toString() !== req.user.id ) {
      return res.status(400).send({ errors: [{ msg: "Order not found" }] })
    }
    
    res.status(200).json(order)

  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: "Order not found" }] });
  }
} )


// Update an Order
router.put('/orders/:orderId', auth, async (req, res) => { 

  try {
    const order = await Order.findById( req.params.orderId);
    if (!order || order.customerId !== req.user.id ) {
      return res.status(400).send({ errors: [{ msg: "Order not found" }] })
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
