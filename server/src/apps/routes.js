import express from "express";
import authRouter from "./auth/auth.routes.js";
import snippetRouter from "./snippets/snippet.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/snippets", snippetRouter);

export default router;
