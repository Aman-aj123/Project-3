require('dotenv').config();

const mongoose = require("mongoose");

const mongoURI =   process.env.connectionURI;

const connectToMongo = async () => {
     try {
          await mongoose.connect(mongoURI);
          console.log("Connected to mongodb sucessfully...")
     } catch (error) {
          console.log(`Error happens while connecting to mongodb with : ${error}`)
     }
}


module.exports = { connectToMongo };