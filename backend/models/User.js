const mongoose = require("mongoose");
const { Schema } = require("mongoose")

// Creating a schema for user
const userSchema = new mongoose.Schema({
     name: {
          type: String,
          require: true
     },
     password: {
          type: String,
          require: true
     },
     email: {
          type: String,
          require: true,
          unique: true
     },
     date: {
          type: Date,
          default: Date.now
     }
});


const User = mongoose.model("User", userSchema);
User.createIndexes();

module.exports = User;