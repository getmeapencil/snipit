import jwt from "jsonwebtoken";
import globalConfig from "./index.js";

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, globalConfig.jwtSecret, {
    expiresIn: "2h",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, globalConfig.jwtSecret, {
    expiresIn: "30d",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, globalConfig.jwtSecret);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return { expired: true };
    }
    return null;
  }
};
