const jwt = require('jsonwebtoken');
const config = require('config');

// Models
const  Admin = require('../models/Admin');

// Helpers
const createAdminToken = require('../helpers/auth/createAdminToken');


module.exports = async function (req, res, next) {
  // // Get token from header
  // const token = req.header('x-auth-token')
  // const userType = req.header('userType')


  // // Check if not token
  // if (!token || userType !== 'Admin') {
  //   return res.status(401).json({
  //     msg: 'No token, authorization denied'
  //   })
  // }
  // // Verify token
  // try {
  //   const decoded = jwt.verify(token, config.get('jwtSecretAdmin'))

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
    const decoded = jwt.verify(xAuthToken, config.get('jwtSecretAdmin'));
    req.user = decoded.user
    let clientAdminUser = await Admin.findById(decoded.user.id);
    if ( !clientAdminUser || clientAdminUser.isActive === false   ) {
      return res.status(401).json({ msg: 'Unauthorized Request!' });
    }
    req.clientAdminUser = clientAdminUser;
    res.cookie(
      'xAuthToken',
      createAdminToken(clientAdminUser),
      { 
        maxAge: 1000 * 60 * 15, // 15 min (unit: millliseconds)
        // httpOnly: true // so we can not use it in Jaavscript or manipulate it
      }
    );
    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'Unauthorized Request!' });   
  }
}