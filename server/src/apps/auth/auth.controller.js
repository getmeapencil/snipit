import {
  generateTokens,
  generateAccessToken,
  verifyToken,
} from "#src/config/jwt.config.js";
import globalConfig from "#src/config/index.js";
import { User } from "#src/apps/models.js";

export const handleGoogleCallback = async (req, res) => {
  if (!req.user) {
    console.error(
      "Google authentication failed:",
      req.user,
      globalConfig.clientUrl,
    );
    return res.redirect(
      `${globalConfig.clientUrl}/auth/callback?error=Google_Authentication_Failed`,
    );
  }

  try {
    const { accessToken, refreshToken } = generateTokens(req.user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: globalConfig.nodeEnv === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    res.redirect(
      `${globalConfig.clientUrl}/auth/callback?token=${accessToken}`,
    );
  } catch (error) {
    res.redirect(
      `${globalConfig.clientUrl}/auth/callback?error=Google_Authentication_Failed`,
    );
  }
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token required" });
  }

  try {
    // Verify refresh token
    const decoded = verifyToken(refreshToken);

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Generate new access token
    const accessToken = generateAccessToken(user);

    res.status(200).json({ success: true, accessToken });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid refresh token" });
  }
};

export const getCurrentAuthenticatedUser = (req, res) => {
  const { _id, username, email, profilePicture } = req.user;
  res.status(200).json({
    success: true,
    user: {
      id: _id,
      username,
      email,
      profilePicture,
    },
  });
};

export const handleLogout = (req, res) => {
  res.clearCookie("refreshToken", { path: "/" });
  return res.status(200).json({
    success: true,
    message: "Logged out. Refresh token cleared.",
  });
};

export const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user._id;

    if (
      !username ||
      typeof username !== "string" ||
      username.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Username is required and cannot be empty",
      });
    }

    const trimmedUsername = username.trim();

    // Update the user's username
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: trimmedUsername },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { _id, email, profilePicture } = updatedUser;
    res.status(200).json({
      success: true,
      message: "Username updated successfully",
      user: {
        id: _id,
        username: trimmedUsername,
        email,
        profilePicture,
      },
    });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
