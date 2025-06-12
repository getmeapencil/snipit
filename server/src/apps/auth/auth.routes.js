import express from "express";
import passport from "passport";
import {
  handleGoogleCallback,
  refreshAccessToken,
  getCurrentAuthenticatedUser,
  handleLogout,
  updateUsername,
} from "./auth.controller.js";
import { requireAuth } from "#src/middlewares/requireAuth.js";
import globalConfig from "#src/config/index.js";

const router = express.Router();

// Route to initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// Callback route after Google has authenticated the user
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${globalConfig.clientUrl}/auth/callback?error=Google_Authentication_Failed`, // Redirect on failure
    session: false, // Ensure session is used by Passport
  }),
  handleGoogleCallback, // Controller to handle successful auth
);

router.post("/refresh-token", refreshAccessToken);

// Get current user
router.get("/me", requireAuth, getCurrentAuthenticatedUser);

// Logout
router.post("/logout", requireAuth, handleLogout);

// Update username
router.put("/update-username", requireAuth, updateUsername);

export default router;
