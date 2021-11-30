import { Comment } from '../models/comment';
import { sqlPager } from '../util/sql';
import { db } from './db';

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

export function getAllComments(recipeId: string, limit?:number, offset?:number): Promise<Comment[]> {
    let query : string = "SELECT * FROM comment WHERE recipe_id = ?";
    query = sqlPager(query, limit, offset);

    return new Promise((resolve, reject) => {
        db.all(query, [recipeId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let comments: Comment[] = [];
                rows.forEach((row) => {
                    let comment : Comment = {
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

export function getComment(commentId: string): Promise<Comment> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM comment WHERE id = ?`, [commentId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                let comment : Comment = {
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

export function deleteComment(commentId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM comment WHERE id = ?`, [commentId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function deleteAllComments(recipeId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM comment WHERE recipe_id = ?`, [recipeId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}