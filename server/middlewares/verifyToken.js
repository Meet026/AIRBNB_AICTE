import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Check if cookies are present
    const cookies = req.headers.cookie;
    if (!cookies) {
      return next(createError(401, "You are not authenticated!"));
    }

    // Parse cookies to extract the accessToken
    const token = cookies
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="))
      ?.split("=")[1];

    if (!token) {
      return next(createError(401, "Access token is missing!"));
    }

    // Verify the access token
      const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decode; // Attach decoded user info to `req.user`

      return next(); // Proceed to the next middleware/controller
  } catch (err) {
    return next(createError(403, "Invalid or expired token!"));
  }
};