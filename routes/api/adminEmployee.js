const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Admin = require('../../models/Admin')
const jwt = require('jsonwebtoken')
const config = require('config')
const authAdmin = require('../../middleware/authAdmin');



// Get All Employee Info
router.get('/', authAdmin, async (req, res ) => {
  try {       
    const employeeList = await Admin.find(
      // {isEmployee: true}
    ).select('-password');
    const _clientAdmin = await Admin.findById(req.user.id);
    if ( !_clientAdmin || _clientAdmin.isEmployee === true ) {
      // if employee -> then fetch only herself/himself
      return res.status(200).json(
        employeeList.filter(
          item => item._id.toString() === _clientAdmin._id.toString()
        )
      );
    } 
    res.status(200).json(employeeList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Add a new Employee
router.post(
  '/add', 
  authAdmin,  
  [  // Express Validator
    check("username", "Please Enter a Valid Username!").isString(),
    check("username", "Please Enter a Valid Username!").notEmpty(),
    check("email", "Please Enter a Valid Email Address!").notEmpty(),   
    check("email", "Please Enter a Valid Email Address!").isEmail(),   
    check("password", "Please Enter a Valid Password with Length of min 8 Characters!").isString(),   
    check("password", "Please Enter a Valid Password with Length of min 8 Characters!").isLength({ min: 8 }),   
  ], // End of Express Validator
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const _clientAdmin = await Admin.findById(req.user.id);
      if ( !_clientAdmin || _clientAdmin.isEmployee === true ) {
        return res.status(400).json(
          { errors: [{ msg: "You are not allowed to perform this action!" }] }
        );
      }
      const {
        username,
        email,
        // password  // this will be used as req.body.password
      } = req.body;
      const _checkIfThisAccountExists = await Admin.find({
        $or: [
          {
            username: {
              $regex: new RegExp(username),
              $options: "i" // case Insensitive
            }
          },
          {
            email: {
              $regex: new RegExp(email),
              $options: "i" // case Insensitive
            }
          }
        ]
      }).select('-password');
      if (_checkIfThisAccountExists.length > 0 ) {
        return res.status(400).json({ errors: [{ msg: "There is already an Employee with Same Credentials!" }] });
      }
      // This is because, password is a necessary field
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash((req.body.password || "aPassword"), salt);
      // Create Employee Object
      const employeeObject = {}
      const variablesArray = ['username', 'email'];
      variablesArray.forEach( variable => {
        if(req.body[variable]){
          employeeObject[variable] = req.body[variable];
        }
      });
      const newEmployee = new Admin({
        ...employeeObject,
        password,
        isEmployee: true
      });  
      await newEmployee.save();
      // Mutate for sending  to Client without password
      const employeeForClient = new Object( {...newEmployee._doc})
      delete employeeForClient.password; // to send client  
      res.status(200).json({
        msg: "Employee is added successfully",
        employee: employeeForClient
      });    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);  // End of Add a new Employee








module.exports = router;