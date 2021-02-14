const express = require("express");
const router = express.Router();
const Admin = require('../../models/Admin');
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route   POST api/admin/register
// @desc    Register Admin
// @access  Public
router.post(
  "/",

  [  // Express Validator
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ], // End of Express Validator
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { username, email, password } = req.body;
    try {
      let adminList = await Admin.find({});
      if (adminList.length > 0 ) {        
        return res.status(400).json(
          { errors: [{ msg: "There is one super admin. You can not register via this endpoint" }] }
        );
      }      
      // See if user email exists
      let admin = await Admin.findOne({ email: email });
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // See if user username exists
      admin = await Admin.findOne({ username });
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }



      admin = new Admin({
        username,
        email,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt)

      await admin.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: admin._id.toString(),
          type: 'Admin'
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
  }
);

module.exports = router;