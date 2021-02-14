const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../../models/User");
const Order = require("../../models/Order");
const UserActivity = require("../../models/UserActivity");

const authAdmin = require("../../middleware/authAdmin");


// Get All Activities
router.get("/activities", authAdmin, async (req, res) => {
  try {
    const userActivityList = await UserActivity
      .find({})
      .populate("customerId", "username", User)
      .populate('orderId', 'orderStatus');

    // const orderList = await Order.find({}).populate("user", "username");

    res.status(200).json( userActivityList.reverse() );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get All Payments
router.get("/payments",  async (req, res) => {
  try {
    const userActivityList = await UserActivity.find({
      activityType: "payment"
    }).populate("customerId", "username", User);


    res.status(200).json(userActivityList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Get A Single UserActivity Info - To Update
router.get("/payments/:activityId", authAdmin, async (req, res) => {
  try {
    // Check if activity exists
    const userActivity = await UserActivity.findById(
      req.params.activityId
    ).populate("customerId", "username name surName middleName email balance", User);

    res.status(200).json(userActivity);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "User Activity not found" }] });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Update a Payment
router.put("/payments/:activityId", 
  authAdmin, 
  [  // Express Validator
    check("customerId", "Please Enter Customer ID").isString(),
    check("amount", "Please Enter a Valid Payment Amount!").isFloat({
      max:-1  // payment is Minus
    }),   
  ], // End of Express Validator
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { customerId, activityType, amount } = req.body
      // Check if activity exists
      const initialActivity = await UserActivity.findById(
        req.params.activityId
      )

      // If customer also changes
      if (customerId.toString() !== initialActivity.customerId.toString()) {
        // Firstly find both initial and current users
        const initialUser = await User.findById(initialActivity.customerId);
        const currentUser = await User.findById(customerId);

        // Update Initial Customer Balance
        currentUser.balance += initialActivity.amount;
        await initialUser.save();

        // Update Current Customer Balance
        currentUser.balance += amount * -1;
        await currentUser.save();

        initialActivity.customerId = customerId;
        initialActivity.amount = amount;
        await initialActivity.save();
      } else {
        // So, customer does NOT change

        // Update Customer Balance
        // const user = await User.findById(customerId);
        const user = await User.findById(customerId);
        user.balance += initialActivity.amount - amount;
        await user.save();

        initialActivity.amount = amount;
        await initialActivity.save();
      }

      res.status(200).json({
        payment: initialActivity,
        msg: 'Payment is successfully updated'
      });

    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ errors: [{ msg: "Not found object!!" }] });
      }
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
