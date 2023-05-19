import { Comment, User } from "@prisma/client";

export interface LocalComment extends Comment {
  user: User;
}
