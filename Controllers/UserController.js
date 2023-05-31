const User = require('../Models/Usermodel');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const sendToken = require('../Utils/jwtTokenHandler');

//Register user
exports.registerUser = async (req, res) => {
  try {
    const { email, name, password, cpassword } = req.body;
    if (!email || !name || !password || !cpassword) {
      return res.status(401).json({ message: "enter valid details", sucess: false })
    } else if (password != cpassword) {
      return res.status(401).json({ message: "password does not match", sucess: false })
    }
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(404).json({ message: "user already exist", sucess: false })
    }
    const secpassword = await bcryptjs.hash(password, 10);

    user = await User.create({
      name: name,
      email: email,
      password: secpassword

    })

    sendToken(user, 201, res);

  } catch (error) {

    return res.status(500).json({ message: error.message, sucess: false })

  }
}

//Login user
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "enter valid email and password", sucess: false })
  }
  if (email=="" || password=="") {
    return res.status(400).json({ message: "enter valid email and password", sucess: false })
  }
  try {
    let user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(400).json({ message: "user not found", sucess: false })
    }

    const comparePassword = await bcryptjs.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "enter valid password", sucess: false })

    }
    sendToken(user, 201, res);

  } catch (error) {
    return res.status(500).json({ message: error.message, sucess: false })
  }
}

//Logout user

exports.Logout=async(req,res)=>{

  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })

  res.status(200).json({sucess:true,message:"Logged out sucessfully"})

}


//Get User
exports.GetUser = async (req, res) => {

  const userId = req.id;

  try {
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({ user, sucess: true });
  } catch (error) {
    return res.status(401).json({ message: "access denied", sucess: false })
  }

}
