import * as commentDAO from "../storage/comment";
import * as recipeDAO from "../storage/recipe";
import { Comment } from '../models/comment';
import { generateUUID } from "../util/uuid";

/**
 * Create a new comment
 * @param comment Comment to be added
 * @returns Promise with the added comment
 */
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

/**
 * Get all comments for a recipe
 * @param recipe_id Id of the recipe
 * @param limit limit of comments to be returned
 * @param offset offset of comments to be returned
 * @returns Promise with the comments
 */
export function getAllComments(recipe_id: string, limit: number, offset: number): Promise<Comment[]> {
    //Check if recipe exits
    return new Promise<Comment[]>((resolve, reject) => {
        recipeDAO.getRecipe(recipe_id).then(recipe => {
            if (recipe) {
                commentDAO.getAllComments(recipe_id, limit, offset).then(comments => {
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

/**
 * Get a comment by id
 * @param comment_id comment id
 * @param recipe_id (optional) recipe id
 * @returns Promise with the comment
 */
export function getComment(comment_id: string, recipe_id?: string): Promise<Comment> {
    if (recipe_id) {
        return new Promise<Comment>((resolve, reject) => {
            recipeDAO.getRecipe(recipe_id).then(recipe => {
                if (recipe) {
                    commentDAO.getComment(comment_id).then(comment => {
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
    } else {
        return commentDAO.getComment(comment_id);
    }
}

/**
 * Delete a comment
 * @param comment_id comment id
 * @returns empty promise
 */
export function deleteComment(comment_id: string): Promise<void> {
    return commentDAO.deleteComment(comment_id);
}