const express = require("express");
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require("../../models/User");
const Order = require("../../models/Order");
const Service = require("../../models/Service");
const UserActivity = require("../../models/UserActivity");

const authAdmin = require('../../middleware/authAdmin')

// Add a New Order
router.post(
  '/', 
  authAdmin,
  [  // Express Validator
    check("user", "Please Enter a Valid User ID!").isString(),
    check("user", "Please Enter a Valid User ID!").notEmpty(),
    check("serviceList", "Please Add Services for Order!").isArray(),
    check("serviceList", "Please Add Services for Order!").isLength({min: 1}),
    check("orderTotalPrice", "Please Enter a Valid Order Total Price!").isNumeric(),   
    check("orderTotalPrice", "Please Enter a Valid Order Total Price!").isFloat({min: 1}),    
  ], // End of Express Validator 
  async ( req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const {
        user,  // user ID
        // date,  // Date is auto-created
        serviceList,
        orderStatus,
        orderTotalPrice
      } = req.body;
      // Check if there is that customer exists
      const customer = await User.findById(user);
      if( ! customer) {
        return res.status(400).json({ errors: [{ msg: "User does not exist!" }] })
      } 
      // Check Service Existence
      const _serviceOrList = serviceList.map(
        ( serviceItem ) => {
          return {
            _id: serviceItem.service
          }
        }
      );
      const serviceListFromDb = await Service.find({
        $or: [
          ..._serviceOrList
        ]
      });
      if( serviceListFromDb.length !== serviceList.length ) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Service ID!" }],
        });
      }
      // Check Service List
      for (let i = 0; i < serviceList.length; i++ ) {
        let relatedServiceIndex = serviceListFromDb.findIndex( item => item._id.toString() === serviceList[i].service);
        if (  relatedServiceIndex < 0 ) {
          return res.status(400).json({ errors: [{ msg: "Service List Error!" }] }); 
        }
        if ( serviceList[i].serviceName !== serviceListFromDb[relatedServiceIndex].serviceName ) {
          return res.status(400).json({ errors: [{ msg: "Service List Error!" }] });
        }
        if ( 
          !serviceList[i].quantity 
          || !Number.isInteger(  serviceList[i].quantity )
          || serviceList[i].quantity <= 0
        ) {
          return res.status(400).json({ errors: [{ msg: "Each Service Quantity should be greater than zero!" }] });
        }
        if ( 
          !serviceList[i].unitPrice 
          || isNaN(  serviceList[i].unitPrice )
          ||  serviceList[i].unitPrice.toFixed(2) !== serviceListFromDb[relatedServiceIndex].servicePrice.toFixed(2)
        ) {
          return res.status(400).json({ errors: [{ msg: "Service List Error!" }] });
        }
        if ( 
          !serviceList[i].unitTotalPrice 
          || isNaN(  serviceList[i].unitTotalPrice )
        ) {
          return res.status(400).json({ errors: [{ msg: "Service Item Unit Total Price doesn't exist!" }] });
        }
        if ( 
          ( serviceList[i].quantity * serviceList[i].unitPrice )
            .toFixed(2) !== 
            serviceList[i].unitTotalPrice.toFixed(2)   
        ) {
          return res.status(400).json({ errors: [{ msg: "Service Item Total Price Miscalculated!" }] });
        }       
      }     
      const newOrder = new Order({
        user,
        serviceList,
        orderStatus,
        orderTotalPrice
      });
      await newOrder.save();
      customer.balance = customer.balance-orderTotalPrice
      await customer.save();
      // Save to User Activity
      const userActivity = new UserActivity({
        orderId: newOrder._id,
        customerId: customer._id,
        activityType: "order",
        amount: orderTotalPrice
      });
      await userActivity.save();  
      res.status(200).json({
        msg: "Order is added successfully",
        order: newOrder
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);  // End of Add a New Order


// Update An Order Info
router.put(
  '/:orderId', 
  authAdmin, 
  [  // Express Validator
    check("user", "Please Enter a Valid User ID!").isString(),
    check("user", "Please Enter a Valid User ID!").notEmpty(),
    check("serviceList", "Please Add Services for Order!").isArray(),
    check("serviceList", "Please Add Services for Order!").isLength({min: 1}),
    check("orderTotalPrice", "Please Enter a Valid Order Total Price!").isNumeric(),   
    check("orderTotalPrice", "Please Enter a Valid Order Total Price!").isFloat({min: 1}),    
  ], // End of Express Validator 
  async ( req, res) => { 
    try {
      // Check if order exists & See its initial status
      const order = await Order.findById(req.params.orderId);
      if ( !order ) {
        return res.status(400).json({ errors: [{ msg: "Order does not exist!" }] });
      }
      const {
        user,  // userId
        serviceList,
        orderStatus,
        orderTotalPrice
      } = req.body;
      console.log('routes/adminOrders -> update order -> req.body -> ',req.body);
      // Check Service Existence
      const _serviceOrList = serviceList.map(
        ( serviceItem ) => {
          return {
            _id: serviceItem.service
          }
        }
      );
      const serviceListFromDb = await Service.find({
        $or: [
          ..._serviceOrList
        ]
      });
      if( serviceListFromDb.length !== serviceList.length ) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Service ID!" }],
        });
      }
      // Check Service List
      for (let i = 0; i < serviceList.length; i++ ) {
        let relatedServiceIndex = serviceListFromDb.findIndex( item => item._id.toString() === serviceList[i].service);
        if (  relatedServiceIndex < 0 ) {
          return res.status(400).json({ errors: [{ msg: "Service List Error!" }] }); 
        }
        if ( serviceList[i].serviceName !== serviceListFromDb[relatedServiceIndex].serviceName ) {
          return res.status(400).json({ errors: [{ msg: "Service List Error!" }] });
        }
        if ( 
          !serviceList[i].quantity 
          || !Number.isInteger(  serviceList[i].quantity )
          || serviceList[i].quantity <= 0
        ) {
          return res.status(400).json({ errors: [{ msg: "Each Service Quantity should be greater than zero!" }] });
        }
        if ( 
          !serviceList[i].unitPrice 
          || isNaN(  serviceList[i].unitPrice )
          ||  serviceList[i].unitPrice.toFixed(2) !== serviceListFromDb[relatedServiceIndex].servicePrice.toFixed(2)
        ) {
          return res.status(400).json({ errors: [{ msg: "Service List Error!" }] });
        }
        if ( 
          !serviceList[i].unitTotalPrice 
          || isNaN(  serviceList[i].unitTotalPrice )
        ) {
          return res.status(400).json({ errors: [{ msg: "Service Item Unit Total Price doesn't exist!" }] });
        }
        if ( 
          ( serviceList[i].quantity * serviceList[i].unitPrice )
            .toFixed(2) !== 
            serviceList[i].unitTotalPrice.toFixed(2)   
        ) {
          return res.status(400).json({ errors: [{ msg: "Service Item Total Price Miscalculated!" }] });
        }       
      } 

      // Check if there is that NEW customer exists
      const customer = await User.findById(user);
      if (!customer) {
        return res.status(400).json({ errors: [{ msg: "User does not exist!" }] });
      }


      const initialTotal = order.orderTotalPrice; // to calculate new balance

      // Update Order Fields & Save To DB
      order.user = user;
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

      userActivity.customerId = user;
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
  } 
);

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
    ).populate('serviceList.service', 'productName serviceName ' );  // productName serviceType

    res.status(200).json(order);
    
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
