const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Admin = require('../../models/Admin')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const authAdmin = require('../../middleware/authAdmin')


// ------------------------------Admin--------------------------------

// Admin Auth
router.get('/admin', authAdmin,  async (req, res) => {

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
})


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

    // Return jsonwebtoken
    const payload = {
      user: {
        id: admin.id,
        type: 'Admin'
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecretAdmin'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, userType: "Admin" });
      }
    )

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

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
        type: 'user'
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, userType: 'user' })
      }
    )

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


// User Auth
router.get('/users', auth, async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
  // res.send('Auth route')
})


module.exports = router