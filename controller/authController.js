const users = require("../model/userSchema");
// const asyncHandler = require("express-async-handler");

const JWT_SECRET_KEY = "your_secret_key_here";
const jwt = require("jsonwebtoken");

//
const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { email, phone } = req.body;
    // Check if the user already exists
    const existingUser = await users.findOne({ email, phone });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    /// new user
    let newUser = new users(req.body);
    // save user
    let savedUser = await newUser.save();
    //prepare to response
    const responseData = savedUser.toObject();
    delete responseData.password;
    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (email && password) {
      let data = await users.findOne({ email });
      console.log(data);
      if (data) {
        if (data.password === password) {
          const token = jwt.sign({ userId: data._id }, JWT_SECRET_KEY);
          res.status(200).send({ message: "Login Successfully", token });
        } else {
          res.status(401).send({ message: "Wrong Password" });
        }
      } else {
        res.status(400).send({ message: "No User Found" });
      }
    } else {
      res.status(400).send({ message: "All Fields Required" });
    }
  };

module.exports = { registerUser, loginUser };
