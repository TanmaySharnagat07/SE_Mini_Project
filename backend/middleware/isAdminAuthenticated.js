import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Assuming User model exists

const isAdminAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Verify user exists in the database
    const user = await User.findById(decoded.id); // Assuming the JWT contains the user ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has admin or superadmin role
    if (user.role === "admin" || user.role === "superadmin") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Admin authentication failed", error: error.message });
  }
};

export default isAdminAuthenticated;
