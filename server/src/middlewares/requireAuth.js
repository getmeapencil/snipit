import { verifyToken } from "#src/config/jwt.config.js";
import User from "#src/apps/auth/user.model.js";

export const requireAuth = async (req, res, next) => {
  // Check for JWT Bearer token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  // Verify JWT token
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (decoded && decoded.expired) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token expired.",
      code: "TOKEN_EXPIRED",
    });
  }

  if (!decoded) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. Invalid token." });
  }

  try {
    // Get user from database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Error fetching user for token:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying authentication." });
  }
};
