import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
// Configuration
import globalConfig from "./config/index.js"; // For centralized config access
import connectDB from "./config/db.config.js";
import configurePassport from "./config/passport.config.js"; // Central Passport config
import passport from "passport"; // Import passport after configuration

// Routes - to be aggregated from 'apps'
import mainRouter from "./apps/routes.js"; // A new file to aggregate app routes

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const port = globalConfig.port || 5000;

// Cookie Parser
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: globalConfig.clientUrl,
    credentials: true,
  }),
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport Initialization
configurePassport(passport); // Call the configuration function
app.use(passport.initialize());

// Mount All Application Routes
app.use("/api", mainRouter); // All routes prefixed with /api

// Root Route
app.get("/", (req, res) => {
  res.send("SnipIt API is alive!");
});

server.listen(port, () => {
  console.log(`Server running in ${globalConfig.nodeEnv} mode on port ${port}`);
});
