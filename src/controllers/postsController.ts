/**
 * Posts controller (Controller layer).
 *
 * Controllers should:
 * - Validate/shape input (lightly)
 * - Call repository functions
 * - Return results to routes
 *
 * Controllers should NOT contain database code.
 */

import type { CreatePostInput, UpdatePostInput, Post } from "../models/post.ts";
import * as postsRepo from "../repositories/postsRepo.js";

export function getAllPosts(): Post[] {
  return postsRepo.listPosts();
}

export function addPost(authorId: string, input: CreatePostInput): Post {
  // Minimal validation in the lab
  if (!input.title || !input.body) {
    throw new Error("title and body are required");
  }

  return postsRepo.createPost(authorId, input);
}

export function editPost(id: string, input: UpdatePostInput): Post {
  const updated = postsRepo.updatePost(id, input);
  if (!updated) {
    throw new Error("post not found");
  }
  return updated;
}