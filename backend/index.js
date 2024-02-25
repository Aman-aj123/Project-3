require("dotenv").config();

const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());

app.use(express.json());

//---> Connecting to mongoDb
const { connectToMongo } = require("./db.js");
connectToMongo();

app.get("/", (req, res) => {
     res.send("Welcome to the iNOTEBOOK...")
});


// Routes variables
const userRoute = require("./routes/auth");
const notesRoute = require("./routes/notes");

//----> Custom routes 
app.use("/api/user/auth", userRoute);
app.use("/api/notes", notesRoute);





//----> Starting the server 
app.listen(port, () => {
     console.log(`Server is listen on http://localhost:${port}`)
});