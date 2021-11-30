import * as commentDAO from "../storage/comment";
import * as recipeDAO from "../storage/recipe";
import { Comment } from '../models/comment';
import { generateUUID } from "../util/uuid";


export function createComment(comment: Comment): Promise<Comment> {
    comment.id = generateUUID();
    comment.time = new Date();

    //Check if recipe exits
    return new Promise<Comment>((resolve, reject) => {
        recipeDAO.getRecipe(comment.recipe_id).then(recipe => {
            if (recipe) {
                commentDAO.createComment(comment).then(comment => {
                    resolve(comment);
                }).catch(error => {
                    reject(error);
                });
            } else {
                reject(new Error("Recipe not found"));
            }
        }).catch(error => {
            reject(error);
        });
    });
}

export function getAllComments(recipeId: string, limit: number, offset:number): Promise<Comment[]> {
    //Check if recipe exits
    return new Promise<Comment[]>((resolve, reject) => {
        recipeDAO.getRecipe(recipeId).then(recipe => {
            if (recipe) {
                commentDAO.getAllComments(recipeId, limit, offset).then(comments => {
                    resolve(comments);
                }).catch(error => {
                    reject(error);
                });
            } else {
                reject(new Error("Recipe not found"));
            }
        }).catch(error => {
            reject(error);
        });
    });
}

export function getComment(commentId: string, recipeId?: string): Promise<Comment> {
    if (recipeId) {
        return new Promise<Comment>((resolve, reject) => {
            recipeDAO.getRecipe(recipeId).then(recipe => {
                if (recipe) {
                    commentDAO.getComment(commentId).then(comment => {
                        resolve(comment);
                    }).catch(error => {
                        reject(new Error("Comment not found"));
                    });
                } else {
                    reject(new Error("Recipe not found"));
                }
            }).catch(error => {
                reject(error);
            });
        });
    }else {
        return commentDAO.getComment(commentId);
    }
}

export function deleteComment(commentId: string): Promise<void> {
    return commentDAO.deleteComment(commentId);
}