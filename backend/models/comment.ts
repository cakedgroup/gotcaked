import {db} from './db';
import { generateUUID } from "../util/uuid";

export interface Comment {
    id: string;
    text: string;
    userId: string;
    recipeId: string;
    time: Date;
}

export function createComment(comment: Comment): Promise<Comment> {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO comments (id, text, userId, recipeId, time) VALUES (?, ?, ?, ?, ?)`,
            [comment.id, comment.text, comment.userId, comment.recipeId, comment.time],
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

export function getComment(id: string): Promise<Comment> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM comments WHERE id = ?`, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    let comment : Comment = {
                        id: row.id,
                        text: row.text,
                        userId: row.userId,
                        recipeId: row.recipeId,
                        time: row.time
                    };
                    resolve(comment);
                } else {
                    reject(new Error("Comment not found"));
                }
                
            }
        });
    });
}