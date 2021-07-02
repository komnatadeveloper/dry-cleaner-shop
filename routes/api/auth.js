const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')

// Helpers
const createAdminToken = require('../../helpers/auth/createAdminToken');
const createCustomerToken = require('../../helpers/auth/createCustomerToken');

// Middleware
const authAdmin = require('../../middleware/authAdmin')

// Models
const User = require('../../models/User')
const Admin = require('../../models/Admin');

// ------------------------------Admin--------------------------------

// Admin Auth
router.get(
  '/admin', 
  authAdmin,  
  async (req, res) => {
    try {
      const admin = await Admin.findById(req.user.id).select('-password')
      res.json({
        admin,
        userType: 'Admin'
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
    // res.send('Auth route')
  }
);


// Admin Login
router.post('/admin', async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({email})
    if( !admin ) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    // Check Username
    if(admin.username !== username) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })      
    }

    // Confirm password
    const isMatch = await bcrypt.compare(password, admin.password);

    if( !isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    res.cookie(
      'xAuthToken',
      createAdminToken(admin),
      { 
        maxAge: 1000 * 60 * 15, // 15 min (unit: millliseconds)
        // httpOnly: true // so we can not use it in Jaavscript or manipulate it
      }
    );
    res.status(200).send();


  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')    
  }
})



// ------------------------------User--------------------------------
// User Login
router.post('/users', async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username, email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    // Confirm password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    res.cookie(
      'xAuthToken',
      createCustomerToken(user),
      { 
        maxAge: 1000 * 60 * 15, // 15 min (unit: millliseconds)
        // httpOnly: true // so we can not use it in Jaavscript or manipulate it
      }
    );
    res.cookie(
      'userType',
      'user',
      { 
        maxAge: 1000 * 60 * 15, // 15 min (unit: millliseconds)
      }
    );
    res.status(200).json({userType: 'user'});
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


// User Auth
router.get('/users', auth, async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json({
      user,
      userType: 'user'
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
  // res.send('Auth route')
})


module.exports = router