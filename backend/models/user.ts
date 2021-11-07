import {db} from './db';
import { generateUUID } from "../util/uuid";

export interface User {
    id: string;
    name: string;
    description: string;
    picture_uri: string;
    email: string;
    password: string;
}



export function createUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO user (id, name, description, picture_uri, email, password) VALUES (?, ?, ?, ?, ?, ?)`,
            [generateUUID(), user.name, user.description, user.picture_uri, user.email, user.password],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            }
        );
    });
}

export function getUser(name: string): Promise<User> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM user WHERE name = ?`, [name], function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}
