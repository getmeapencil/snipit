import { Snippet } from "../models.js";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

// Create a new snippet
export const createSnippet = async (req, res) => {
  try {
    const { name, content, flavor, exposure, password, language } = req.body;
    const author = req.user.id;

    // Generate unique ID for the snippet
    const uniqueId = nanoid(10);

    // Hash password if provided
    let hashedPassword = "";
    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const snippetData = {
      name,
      content,
      flavor,
      exposure,
      password: hashedPassword,
      author,
      uniqueId,
    };

    if (flavor === "Code" && language) {
      snippetData.language = language;
    }

    const snippet = new Snippet(snippetData);

    await snippet.save();
    await snippet.populate("author", "username email");

    res.status(201).json({
      success: true,
      message: "Snippet created successfully",
      snippet,
    });
  } catch (error) {
    console.error("Error creating snippet:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create snippet",
      error: error.message,
    });
  }
};

// Get snippet by unique ID
export const getSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const snippet = await Snippet.findOne({ uniqueId: id }).populate(
      "author",
      "username email",
    );

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    // Check access permissions
    const isAuthor = req.user && req.user.id === snippet.author._id.toString();

    // Private snippets - only author can access
    if (snippet.exposure === "private" && !isAuthor) {
      return res.status(403).json({
        success: false,
        message: "Access denied. This snippet is private.",
      });
    }

    // Unlisted snippets with password
    if (snippet.exposure === "unlisted" && snippet.password && !isAuthor) {
      if (!password) {
        return res.status(401).json({
          success: false,
          message: "Password required",
          requiresPassword: true,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, snippet.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
    }

    res.json({
      success: true,
      snippet,
      isAuthor,
    });
  } catch (error) {
    console.error("Error fetching snippet:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch snippet",
      error: error.message,
    });
  }
};

// Update snippet
export const updateSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content, flavor, exposure, password, language } = req.body;

    const snippet = await Snippet.findOne({ uniqueId: id });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    // Check if user is the author
    if (snippet.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only edit your own snippets.",
      });
    }

    // Hash password if provided
    let hashedPassword = snippet.password;
    if (password !== undefined) {
      if (password.trim() === "") {
        hashedPassword = "";
      } else {
        hashedPassword = await bcrypt.hash(password, 10);
      }
    }

    snippet.name = name || snippet.name;
    snippet.content = content || snippet.content;
    snippet.flavor = flavor || snippet.flavor;
    snippet.exposure = exposure || snippet.exposure;
    snippet.password = hashedPassword;

    if (flavor === "Code" && language) {
      snippet.language = language;
    } else if (flavor && flavor !== "Code") {
      snippet.language = undefined;
    }

    await snippet.save();
    await snippet.populate("author", "username email");

    res.json({
      success: true,
      message: "Snippet updated successfully",
      snippet,
    });
  } catch (error) {
    console.error("Error updating snippet:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update snippet",
      error: error.message,
    });
  }
};

// Get user's snippets
export const getUserSnippets = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const snippets = await Snippet.find({ author: userId })
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    const total = await Snippet.countDocuments({ author: userId });

    res.json({
      success: true,
      snippets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching user snippets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch snippets",
      error: error.message,
    });
  }
};

// Get public snippets
export const getPublicSnippets = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const snippets = await Snippet.find({ exposure: "public" })
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      snippets,
    });
  } catch (error) {
    console.error("Error fetching public snippets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch public snippets",
      error: error.message,
    });
  }
};

// Delete snippet
export const deleteSnippet = async (req, res) => {
  try {
    const { id } = req.params;

    const snippet = await Snippet.findOne({ uniqueId: id });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    // Check if user is the author
    if (snippet.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only delete your own snippets.",
      });
    }

    await Snippet.deleteOne({ uniqueId: id });

    res.json({
      success: true,
      message: "Snippet deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting snippet:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete snippet",
      error: error.message,
    });
  }
};
