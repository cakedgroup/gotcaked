import * as commentDAO from "../storage/comment";
import { Comment } from '../models/comment';
import { generateUUID } from "../util/uuid";


export function createComment(comment: Comment, userID : string): Promise<Comment> {
    comment.id = generateUUID();
    comment.time = new Date();
    comment.userId = userID;
    return commentDAO.createComment(comment);
}

export function getComments(recipeId: string): Promise<Comment[]> {
    return commentDAO.getComments(recipeId);
}