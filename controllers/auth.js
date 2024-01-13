const AuthorModel=require('../models/author.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose=require('mongoose')

// Register Callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await AuthorModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    
    const newUser = new AuthorModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};


// login callback 
const loginController = async (req, res) => {
  try {
    const user = await AuthorModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};



// getting my own data
const authController = async (req, res) => {
  try {
    const user = await AuthorModel.findById({ _id: req.body.userId });
    console.log(user._id);
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
     const authors = await AuthorModel.aggregate([
  { $match: { _id: user._id} },
  {
    $lookup: { from: 'books', localField: '_id', foreignField: 'author', as: 'books' },
  },
  {
    $addFields: { bookCount: { $size: '$books' } },
  },
  {
    $project: {
      name: 1,
      email: 1,
      phone_no: 1,
      books: 1,
      bookCount: { $size: '$books' },
    },
  },
]);


res.status(200).send({
  success: true,
  message: 'My Data ',
  data: authors,
      });




    
  }} catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};


module.exports={loginController,registerController,authController}
