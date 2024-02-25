require("dotenv").config();

const jwt = require("jsonwebtoken");

const fetchUsers = (req, res, next) => {
     //----> Get the jwt token from the user
     const JWT_SECRET = process.env.JWT_SECRET;
     const token = req.header('auth-token');

     if (!token) {
          res.status(401).send({ error: "Please authenticate using valied token !" });
     }

     try {
          const data = jwt.verify(token, JWT_SECRET);
          req.user = data.user;
          next();

     } catch (error) {
          res.status(401).send({ error: "Please authenticate using valied token !", errorMessage: error.message  });

          return;
     };
};


module.exports = fetchUsers;