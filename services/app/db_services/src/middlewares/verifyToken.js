import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = decoded; // optional: store decoded data like user_id
      next();
    } catch (err) {
      console.log("error",err.stack)
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
  };
  export default verifyToken;