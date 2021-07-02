const config = require('config');
const jwt = require('jsonwebtoken');

const createAdminToken = adminUserModel => {
  try {    
    // console.log('helpers -> auth -> createAdminToken -> FIRED -> ');
    // Return jsonwebtoken
    const payload = {
      user: {
        id: adminUserModel._id,
        // type: adminUserModel.userType  // meybe in future
        type: 'Admin'
      }
    };
    return jwt.sign(
      payload,
      config.get('jwtSecretAdmin'),
      { expiresIn: 360000 }
    );
  } catch (err) {
    console.log('helpers -> auth -> createAdminToken -> error -> ', err);
  }
}


module.exports = createAdminToken;