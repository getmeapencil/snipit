import express from "express";
import {
  createSnippet,
  getSnippet,
  updateSnippet,
  getUserSnippets,
  getPublicSnippets,
  deleteSnippet,
} from "./snippet.controller.js";
import { requireAuth } from "#src/middlewares/requireAuth.js";

const router = express.Router();

// Public routes
router.get("/public", getPublicSnippets);
router.post("/:id/public-view", getSnippet);

// Protected routes (require authentication)
router.post("/", requireAuth, createSnippet);
router.get("/user", requireAuth, getUserSnippets);
router.put("/:id", requireAuth, updateSnippet);
router.delete("/:id", requireAuth, deleteSnippet);
router.post("/:id/view", requireAuth, getSnippet);

export default router;
