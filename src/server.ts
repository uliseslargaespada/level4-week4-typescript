/**
 * Minimal Express server for the TS lab.
 *
 * We intentionally keep the server small:
 * - Focus is TypeScript types + controller wiring
 */

import express from "express";
import { getAllPosts, addPost } from "./controllers/postsController.js";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, data: { status: "ok" }, meta: {} });
});

app.get("/posts", (_req, res) => {
  const posts = getAllPosts();
  res.json({ ok: true, data: posts, meta: {} });
});

app.post("/posts", (req, res) => {
  // Hardcode author for lab simplicity (auth comes in later weeks)
  const post = addPost("demo-author-id", req.body);
  res.status(201).json({ ok: true, data: post, meta: {} });
});

app.listen(3008, () => {
  console.log("TS Lab API running on http://localhost:3008");
});
