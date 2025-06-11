import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  clientUrl: process.env.CLIENT_URL,
  nodeEnv: process.env.NODE_ENV || "development",
  backendUrl: process.env.BACKEND_URL || `http://localhost:${process.env.PORT}`,
};

export default config;
