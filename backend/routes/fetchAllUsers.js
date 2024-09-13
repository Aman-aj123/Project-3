const express = require("express");
const fetchUsers = require("../middleware/fetchUsers");
const User = require("../models/User");

const router = express.Router();

router.post("/", fetchUsers, async (req, res) => {
     try {
          // displaying all the users
          const users = await User.find({});
          res.status(200).json({ sucess: true, users });

     } catch (error) {
          console.log(`Some internal server error occurs while fetchingAllUsers with: ${error}`);
          res.status(500).json({ sucess: false, error: "Some internal server error occurs while fetchingAllUsers" });
     }
});


module.exports = router;