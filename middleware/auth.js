const jwt = require('jsonwebtoken')
const config = require('config')

// Models
const  User = require('../models/User');

// Helpers
const createCustomerToken = require('../helpers/auth/createCustomerToken');


module.exports = async function (req, res, next) {
  // // Get token from header
  // const token = req.header('x-auth-token')
  // const userType = req.header('userType')

  // // Check if not token
  // if (!token || userType !== 'user' ) {
  //   return res.status(401).json({
  //     msg: 'No token, authorization denied'
  //   })
  // }

  

  // // Verify token
  // try {
  //   const decoded = jwt.verify(token, config.get('jwtSecret'))

  //   req.user = decoded.user
  //   next()
  // } catch (err) {
  //   res.status(401).json({ msg: 'Token is not valid' })
  // }

  try {
    // Get Token from Cookie
    const xAuthToken = req.cookies.xAuthToken;
    if ( !req.cookies || !req.cookies.xAuthToken ) {
      return res.status(401).json({ msg: 'No Token!' })
    }
    // Verify token
    const decoded = jwt.verify(xAuthToken, config.get('jwtSecret'));
    req.user = decoded.user
    let clientCustomerUser = await User.findById(decoded.user.id);
    if ( !clientCustomerUser    ) {
      return res.status(401).json({ msg: 'Unauthorized Request!' });
    }
    req.clientCustomerUser = clientCustomerUser;
    res.cookie(
      'xAuthToken',
      createCustomerToken(clientCustomerUser),
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
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: 'Unauthorized Request!' });
  }


}