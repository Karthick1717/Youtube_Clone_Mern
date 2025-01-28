const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
  
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "Token required" });
    }

    const token = authHeader.split(" ")[1];

      if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

     
    const decode = jwt.verify(token, "secret_key");
    
      
    req.user = decode;
    
   
    next();
  } catch (err) {
    console.log(err);

     if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = { verifyToken };
