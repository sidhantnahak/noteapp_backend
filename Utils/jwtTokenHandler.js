const User = require('../Models/Usermodel');
const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJwtToken();

    const options = {
      secure: true,
      sameSite: "none",
      MaxAge: 3600000 * 5,
      httpOnly: true
      
    }
  
   return res.status(statusCode).cookie("token", token, options).json({ sucess: true, user, token })
  } catch (error) {

    return res.status(401).json({ sucess: false, message: error })
  }
}

module.exports = sendToken