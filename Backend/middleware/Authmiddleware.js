import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByPk(decoded.id);
      if (!user) {
        res.status(401).json({ message: "Not authorized, user not found" });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Rôle ${req.user.role} non autorisé`,
      });
    }
    next();
  };
};
export const authorizeAdminOrSelf = (req, res, next) => {
  const userIdFromToken = req.user.id;
  const userIdFromParams = req.params.id;

  if (req.user.role === "admin" || userIdFromToken == userIdFromParams) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Accès refusé",
  });
};
