import * as commentDAO from "../storage/comment";
import { Comment } from '../models/comment';
import { generateUUID } from "../util/uuid";


export function createComment(comment: Comment): Promise<Comment> {
    comment.id = generateUUID();
    comment.time = new Date();
    return commentDAO.createComment(comment);
}

export function getComments(recipeId: string): Promise<Comment[]> {
    return commentDAO.getComments(recipeId);
}