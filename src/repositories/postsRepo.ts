/**
 * In-memory Posts repository (Week 4 TS lab).
 *
 * This mirrors Week 1–2 behavior without DB:
 * - Data lives in memory
 * - Useful for practicing types and controller logic
 */

import crypto from "crypto";
import type { Post, PostId, CreatePostInput, UpdatePostInput } from "../models/post.ts";

const posts: Post[] = [];

export function listPosts(): Post[] {
  return posts;
}

export function createPost(authorId: string, input: CreatePostInput): Post {
  const post: Post = {
    id: crypto.randomUUID(),
    title: input.title,
    body: input.body,
    authorId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  posts.push(post);

  return post;
}

export function findPostById(id: PostId): Post | undefined {
  return posts.find((p) => p.id === id);
}

export function updatePost(id: PostId, input: UpdatePostInput): Post | undefined {
  const post = findPostById(id);
  if (!post) return undefined;

  if (input.title !== undefined) post.title = input.title;
  if (input.body !== undefined) post.body = input.body;

  return post;
}
