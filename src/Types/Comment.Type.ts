import type { UserType } from "./User.Type";

export interface CommentType {
  _id: string;
  image?: string; 
  content?: string; 
  commentCreator: UserType;
  post: string; 
  parentComment: Comment | null; 
  likes: string[]; 
  createdAt : string;
}
