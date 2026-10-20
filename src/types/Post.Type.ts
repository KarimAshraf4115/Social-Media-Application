import type { CommentType } from "./Comment.Type";
import { type UserType } from "./User.Type";

export interface PostType {
  _id: string;
  body: string;
  privacy: string; // Or a union type if privacy is restricted, e.g., 'public' | 'private'
  user: UserType;
  sharedPost: PostType | null; // Replace 'any' with a specific Post type if shared posts share the same structure
  likes: string[]; // Replace 'any' with a specific Like type if available
  createdAt: string; // ISO date string
  commentsCount: number;
  topComment: CommentType | null; // Replace 'any' with a Comment type if available
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
  image: string;
}
