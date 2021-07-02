const config = require('config');
const jwt = require('jsonwebtoken');

const createCustomerToken = customerUserModel => {
  try {    
    // console.log('helpers -> auth -> createAdminToken -> FIRED -> ');
    // Return jsonwebtoken
    const payload = {
      user: {
        id: customerUserModel._id,
        // type: adminUserModel.userType  // meybe in future
        type: 'user'
      }
    };
    return jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 }
    );
  } catch (err) {
    console.log('helpers -> auth -> createCustomerToken -> error -> ', err);
  }
}


module.exports = createCustomerToken;