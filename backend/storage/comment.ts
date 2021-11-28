import { Comment } from '../models/comment';
import { db } from './db';

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

export function getComments(id: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM comments WHERE id = ?`, [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let comments: Comment[] = [];
                for (let row of rows) {
                    let comment : Comment = {
                        id: row.id,
                        text: row.text,
                        userId: row.userId,
                        recipeId: row.recipeId,
                        time: row.time
                    };
                    comments.push(comment);
                    resolve(comments);
                }
            }
        });
    });
}