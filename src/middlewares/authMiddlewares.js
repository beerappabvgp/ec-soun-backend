import jwt from "jsonwebtoken"
import User from "../schema/UserSchema.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("token:", token);
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token, authorization denied' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET");
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token is not valid' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Token is not valid' 
    });
  }
};

export function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || "SECRET", {
        expiresIn: process.env.JWT_EXPIRE || '30d',
    });
}