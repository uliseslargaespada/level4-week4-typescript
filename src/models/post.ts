/**
 * Post domain model (Model layer).
 *
 * In our MVC approach:
 * - React is the View
 * - This API owns Model + Controller
 */
export type PostId = string | number; // Depending on how you generate IDs, it could be a string or a number

export interface Post {
  id: PostId;
  title: string;
  body: string;
  authorId: string;
  createdAt: string; // Can be a date string or a Date object
  updatedAt?: string; // Optional field for when the post was last updated
}

export interface CreatePostInput { 
  title: string;
  body: string;
}

export interface UpdatePostInput {
  title?: string;
  body?: string;
}
