const { validateToken } = require("../services/tokenService");

const authorizationMiddleware = (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      isNotLogined: true,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];  
  try {
    // Verify the token
    const decoded = validateToken(token);
    // Attach user information to the request object for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        isSessionExpired: true,
        message: "Invalid token",
      });
  }
};

module.exports = authorizationMiddleware;
