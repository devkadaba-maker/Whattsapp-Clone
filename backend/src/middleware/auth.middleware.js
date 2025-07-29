import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protectRoute = async (req, res, next) => {
  try {
    console.log("Entering protectRoute middleware");
    console.log("Request cookies:", req.cookies); // See what cookies are received

    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    console.log("JWT Token found:", token.substring(0, 15) + "..."); // Log part of it

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("JWT Decoded:", decoded); // See what's inside the token
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        console.log("JWT Token expired:", jwtError.message);
        return res.status(401).json({ message: "Not authorized, token expired" });
      } else {
        console.log("JWT Verification failed:", jwtError.message);
        return res.status(401).json({ message: "Not authorized, invalid token" });
      }
    }

    // Removed the `if (!decoded)` here as jwt.verify throws on failure

    const user = await User.findById(decoded.userId).select("-password"); // Ensure `decoded.userId` is the correct key

    if (!user) {
      console.log("User not found in DB for userId:", decoded.userId);
      return res.status(401).json({ message: "Not authorized, user not found" }); // Changed to 401
    }

    req.user = user;
    console.log("User attached to req.user:", req.user._id);
    next();

  } catch (error) {
    console.log("Unhandled error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
