const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createToken = (Model) => {
  const token = sign(Model.username, process.env.TOKEN_SECRETE);
  return token;
};


const verifyToken = (req, res, next) => {
  if (req.cookies && req.cookies["access-token"]) {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
      res.status(400).json({ error: "Unathorized User" });
    }
    if (accessToken) {
      try {
        const payload = verify(accessToken, process.env.TOKEN_SECRETE);
        if (payload) {
          req.authenticated = true;
          next();
        }
      } catch (err) {
        res.status(400).json({ error: err });
      }
    }
  } else {
    res.status(400).json({ error: "Cookies not found" });
  }
};

module.exports = { createToken, verifyToken };
