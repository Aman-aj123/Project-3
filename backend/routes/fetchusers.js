const express = require('express');
const router = express.Router();

const fetchUsers = require("../middleware/fetchUsers");


router.get("/", fetchUsers, (req, res) => {
     console.log("hellow world");
});