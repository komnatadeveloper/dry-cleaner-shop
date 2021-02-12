const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Order = require("../../models/Order");
const UserActivity = require("../../models/UserActivity");
const authAdmin = require('../../middleware/authAdmin')
const bcrypt = require('bcryptjs')

// Add a new Customer
router.post('/add', authAdmin,  async (req, res) => {
  try {
    const {
      username,
      email,
      // password,  A SOLUTION BELOW
      name,
      middleName,
      surName,
      tel1,
      tel2,
      address
    } = req.body;

    // This is because, password is a necessary field
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash((req.body.password || "aPassword"), salt);

    const userObject = {}
    const variablesArray = ['username', 'email', 'name', 'middleName', 'surName', 'tel1', 'tel2', 'address']

    variablesArray.forEach( variable => {
      if(req.body[variable]){
        userObject[variable] = req.body[variable];
      }
    })    

    const newUser = new User({
      ...userObject,
      password,
      balance: 0.00
    });
  
    await newUser.save();

    // Mutate for sending  to Client without password
    const userForClient = new Object( {...newUser._doc})
    delete userForClient.password; // to send client
  
    res.status(200).json({
      msg: "User is added successfully",
      customer: userForClient
    });    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// Update Customer Info
router.put('/info/:customerId', authAdmin,  async (req, res) => { 
  try {

    // Check if customer exists
    const user = await User.findById(req.params.customerId)
    if( !user) {
      return res.status(400).json({ errors: [{ msg: "User does not exist!" }] })
    }

    const variablesArray = [
      // "username",  DISABLED
      // "email",     DISABLED
      "name",
      "middleName",
      "surName",
      "tel1",
      "tel2",
      "address"
    ];

    variablesArray.forEach(variable => {    
      user[variable] = req.body[variable];      
    });

    await user.save()

    // Mutate for sending  to Client without password
    const userForClient = new Object({ ...user._doc });
    delete userForClient.password; // to send client

    res.status(200).json({
      msg: "User Updated Successfully",
      user: userForClient
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Delete Customer
router.delete('/info/:customerId', authAdmin,  async (req, res) => {
  try {
    // Check if customer exists
    const user = await User.findById(req.params.customerId);
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User does not exist!" }] });
    }
    // Check if customer has activities
    const activityList = await UserActivity.find({
      customerId: req.params.customerId
    })
    if( activityList.length > 0) {
      return res.status(400).json(
        { errors: [{ msg: "Customer has activities, and can not be deleted!" }] } );
    }
    // Check if customer has orders
    const orderList = await Order.find({ user: req.params.customerId })
    if( orderList.length > 0) {
      return res.status(400).json(
        { errors: [{ msg: "Customer has orders, and can not be deleted!" }] } );
    }
    await user.remove();
    // Mutate for sending  to Client without password
    const userForClient = new Object( {...user._doc})
    delete userForClient.password; // to send client
    res.status(200).json({
      msg: "Customer has been deleted successfully",
      customer: userForClient
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Get All Customers Info
router.get('/', authAdmin, async (req, res ) => {

  try {
    
    const userList = await User.find({}).select('-password');

    res.status(200).json(userList)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})



// Query Users
router.get('/query', authAdmin, async (req, res) => {
  
  try {
    const searched = req.query.searched
    if(!searched) {
      // Do SMT
    }

    // const serviceList = await Service.find(
    //   {serviceType: {
    //     $regex: new RegExp(searched)
    //   }}
    // )
    const userList = await User.find({
      $or: [
        {
          username: {
            $regex: new RegExp(searched),
            $options: "i" // case Insensitive
          }
        },
        {
          name: {
            $regex: new RegExp(searched),
            $options: "i" // case Insensitive
          }
        },
        {
          surname: {
            $regex: new RegExp(searched),
            $options: "i" // case Insensitive
          }
        }
      ]
    }).select('-password');

    res.status(200).json(userList);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// Get a Single Customer Info
router.get('/info/:customerId', authAdmin,  async (req, res) => {

  try {
    // Check if customer exists
    const user = await User.findById(req.params.customerId).select('-password');
    if(!user ) {
      return res.status(400).json('Customer Not Found')
    }

    res.status(200).json(user)
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
})






// Add a Payment
router.post('/payment/:customerId', authAdmin, async (req, res) => {
  try {
    
    const user = await User.findById(req.params.customerId);

    const payment = parseFloat(parseFloat(req.body.payment).toFixed(2))

    user.balance = parseFloat(user.balance).toFixed(2);

    user.balance += payment;

    await user.save();

    const paymentActivity = new UserActivity({
      customerId: user._id,
      activityType: "payment",
      amount: (req.body.payment)*(-1)
    })

    await paymentActivity.save()

    res.status(200).json({
      msg: "Payment is recorded successfully"      
    })

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// Get All Activities of All Users
router.get('/payment', authAdmin,  async (req, res) => {

  try {
    const activitiyList =  await UserActivity.find( {} );
    res.status(200).json(activitiyList)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  
 })


// Get All Activities of a Single User
router.get('/all-activities/:customerId', authAdmin,  async (req, res) => {

  try {
    const activitiyList = await UserActivity.find({
      customerId: req.params.customerId
    }).populate('orderId', 'orderStatus');
    res.status(200).json(activitiyList)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

 })

 
// Update A Payment
router.put('/payment/:customerId/:activityId', authAdmin,  async (req, res) => {

  try {
    const userActivity = await UserActivity.findById(req.params.activityId);
    if (! userActivity ) {
      return res.status(400).json('Activity Not Found')
    }

    // If CustomerId will also be Updated
    if (userActivity.customerId.toString() !== req.body.customerId.toString()) {
      console.log(userActivity.customerId);
      console.log(req.body.customerId);
      // Initial Customer
      const user1 = await User.findById(userActivity.customerId);
      user1.balance += userActivity.amount;
      await user1.save();

      // Update Activity Model & Save
      userActivity.amount = req.body.amount;
      userActivity.customerId = req.body.customerId;
      await userActivity.save();

      // Save User2 Model
      const user2 = await User.findById(req.body.customerId);
      user2.balance -= req.body.amount;
      await user2.save();

      return res.json("Payment is updated successfully");
    } else {
      const initialAmount = userActivity.amount;

      // Update Activity Object & Save
      userActivity.amount = req.body.amount;
      await userActivity.save();

      // Update & Save User Model
      const user = await User.findById(req.body.customerId);
      user.balance += initialAmount - req.body.amount;
      await user.save();

      res.status(200).json("Payment is updates successfully");
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

})

// Delete A Payment
router.delete('/payment/:customerId/:activityId', authAdmin, async (req, res) => { 
  try {
    const userActivity = await UserActivity.findById(req.params.activityId);
    if( ! userActivity ) {
      return res.status(400).json('Payment not Found')
    } 
    

    const user = await User.findById(userActivity.customerId);
    user.balance += userActivity.amount;

    await userActivity.remove();
    await user.save()

    res.status(200).json('Payment deleted successfully')
    

  } catch (err) {

    console.error(err.message);
    res.status(500).send("Server Error");   
    
  }
})

module.exports = router;
