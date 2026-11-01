
import jwt from "jsonwebtoken";
import User from "../modules/users/user.model.js";

const authenticate = async (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please provide a token.",
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find the user in MongoDB
    const user = await User.findById(decoded.userId)
      .select("_id name phone email roles status");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    // 5. Check current account status
    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active",
      });
    }

    // 6. Attach current user information to request
    req.user = {
      id: user._id.toString(),
      name: user.name,
      phone: user.phone,
      email: user.email,
      roles: user.roles,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
      });
    }

    next(error);
  }
};

export default authenticate;
