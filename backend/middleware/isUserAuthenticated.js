import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isUserAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired." });
  }
};

export default isUserAuthenticated;
