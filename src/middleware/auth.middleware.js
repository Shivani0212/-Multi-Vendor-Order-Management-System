const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    if (req.path === "/api/auth/signup" || req.path === "/api/auth/login") {
      return next();
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided." });
    }

    // ✅ Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔹 Decoded Token:", decoded);

    if (!decoded.id) {  // ✅ Ensure correct field
      return res.status(401).json({ error: "Unauthorized: Token missing user ID." });
    }

    // ✅ Fetch User from Database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(403).json({ error: "Forbidden: User not found." });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error);
    return res.status(401).json({ error: "Unauthorized: Token verification failed." });
  }
};
