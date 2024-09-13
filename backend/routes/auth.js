require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUsers = require("../middleware/fetchUsers");
const RandomColor = require('../utils/RandomColor');

// Packages
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET;


//--------> #1. Creating a user with POST request on "/api/user/auth/signup"
// Applying the error messages
const authChecks = [
     body("name", "Please enter a valied name").isLength({ min: 8, max: 20 }),
     body("email", "Please enter a valied email").isEmail(),
     body("password", "Please enter a valied password").isLength({ min: 8, max: 20 })
];

router.post("/signup", authChecks, async (req, res) => {
     const errors = validationResult(req);

     if (!errors.isEmpty()) {
          // If the errors happens in user credentials then send the error message
          return res.status(400).json({ errors: errors.array(), sucess: false });
     }

     // Check if the user is already exists with the same email
     const isAlreadyUser = await User.findOne({ email: req.body.email });

     if (isAlreadyUser) {
          res.status(400).json({ error: "Sorry, user already exists with this email", sucess: false })
          return;
     }

     // Hashing the passwords of the user
     const salt = await bcrypt.genSalt(10);
     const securePass = await bcrypt.hash(req.body.password, salt);

     // Generating Random colors
     const getRandomColor = RandomColor();

     const createdUser = {
          name: req.body.name,
          email: req.body.email,
          password: securePass,
          profile: {
               color: getRandomColor
          }
     };

     try {
          // Creating the user if all the values are correct
          const createUser = await User.create(createdUser);

          // Sending 'jwtToken' to user 
          const data = {
               user: {
                    id: createUser.id
               }
          };
          const authToken = jwt.sign(data, JWT_SECRET);

          res.status(200).json({ authToken, sucess: true });

     } catch (error) {
          // If the error happens then send the error message
          console.log(`Error happens while creating the user with : ${error}`)
          res.status(500).json({ error: "Please enter a unique value of email", sucess: false })
     }



});




//--------> #2. Authenticating a user with POST request on "/api/user/auth/login"
// Applying the error messages
const loginChecks = [
     body("email", "Please enter a valied email").isEmail(),
     body("password", "Password cannot be blank").exists(),
];


router.post("/login", loginChecks, async (req, res) => {
     const errors = validationResult(req);

     if (!errors.isEmpty()) {
          // If the errors happens in user credentials then send the error message
          return res.status(400).json({ errors: errors.array(), sucess: false });
     };

     const { email, password } = req.body;

     try {
          // Checking if the user credientials are correct or not
          const findedUser = await User.findOne({ email: email });

          // If the credentials are Invalied then send error
          if (!findedUser) {
               res.status(500).json({ error: "Sorry, Please enter correct email !", sucess: false });
               return;
          }

          // Comparing the password value
          const comparePassword = await bcrypt.compare(password, findedUser.password);

          // If the password is invalied then send error
          if (!comparePassword) {
               res.status(500).json({ error: "Sorry, Please enter correct password", sucess: false })
               return;
          }

          //Sending 'jwtToken' to the user
          const data = {
               user: {
                    id: findedUser.id
               }
          };
          const authToken = jwt.sign(data, JWT_SECRET);

          res.status(200).json({ authToken, sucess: true });

     } catch (error) {
          console.log(`Error happens while finding the user with : ${error}`);
          res.send({ error: "Some internal server occurs !", sucess: false });

          return;
     }

});





//-------> #3. Get user loggedin with a POST request on "/api/user/auth/getuser"

router.post("/getuser", fetchUsers, async (req, res) => {

     try {
          const userId = req.user.id;
          const findedUser = await User.findById(userId).select("-password");

          res.send({ findedUser, sucess: true });

     } catch (error) {
          console.log(`Some Internal server occurs with : ${error}`)
          res.status(401).send({ error: `Some Internal server occurs with : ${error}`, sucess: false })
     }

});


 
module.exports = router;


