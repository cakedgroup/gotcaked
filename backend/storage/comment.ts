import { Comment } from '../models/comment';
import { sqlPager } from '../util/sql';
import { db } from './db';

/**
 * Create a new comment in database
 * @param comment comment to create
 * @returns Promise with comment
 */
export function createComment(comment: Comment): Promise<Comment> {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO comment (id, text, user_id, recipe_id, time) VALUES (?, ?, ?, ?, ?)`,
            [comment.id, comment.text, comment.user_id, comment.recipe_id, comment.time],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(comment);
                }
            }
        );
    });
}

/**
 * Get all comments from recipe in database 
 * @param recipe_id recipe id
 * @param limit limit of comments to return
 * @param offset offset of comments to return
 * @returns Promise with comments
 */
export function getAllComments(recipe_id: string, limit?: number, offset?: number): Promise<Comment[]> {
    let query: string = "SELECT * FROM comment WHERE recipe_id = ?";
    query = sqlPager(query, limit, offset);

    return new Promise((resolve, reject) => {
        db.all(query, [recipe_id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let comments: Comment[] = [];
                rows.forEach((row) => {
                    let comment: Comment = {
                        id: row.id,
                        text: row.text,
                        user_id: row.user_id,
                        recipe_id: row.recipe_id,
                        time: row.time
                    };
                    comments.push(comment);
                });
                resolve(comments);
            }
        });
    });
}

/**
 * Get comment by id from database
 * @param comment_id comment id
 * @returns Promise with comment
 */
export function getComment(comment_id: string): Promise<Comment> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM comment WHERE id = ?`, [comment_id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                let comment: Comment = {
                    id: row.id,
                    text: row.text,
                    user_id: row.user_id,
                    recipe_id: row.recipe_id,
                    time: row.time
                };
                resolve(comment);
            }
        });
    });
}

/**
 * Delete comment with id from database
 * @param comment_id comment id
 * @returns empty Promise
 */
export function deleteComment(comment_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM comment WHERE id = ?`, [comment_id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Delete all comments from recipe from database
 * @param recipe_id recipe id
 * @returns empty Promise
 */
export function deleteAllComments(recipe_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM comment WHERE recipe_id = ?`, [recipe_id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}