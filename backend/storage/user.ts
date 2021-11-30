import { User } from "../models/user";
import { sqlPager } from "../util/sql";
import { generateUUID } from "../util/uuid";
import { db } from './db';

export function createUser(user: User): Promise<User> {
    user.id = generateUUID();
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO user (id, role, name, description, picture_uri, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user.id, user.role, user.name, user.description, user.picture_uri, user.email, user.password],
            function (err) {
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
        db.get(`SELECT * FROM user WHERE name = ?`, [name], function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

export function getRandomUser(): Promise<User> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM user WHERE id IN (SELECT id FROM user ORDER BY RANDOM() LIMIT 1)`, function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

export function getUserById(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM user WHERE id = ?`, [id], function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

export function getUserByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM user WHERE email = ?`, [email], function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

//Get All Users with Limits
export function getAllUsers(limit: number, offset: number): Promise<User[]> {
    let query: string = `SELECT * FROM user`;
    query = sqlPager(query, limit, offset);

    return new Promise((resolve, reject) => {
        db.all(query, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                let users: User[] = [];
                rows.forEach((row) => {
                    users.push(row);
                });
                resolve(users);
            }
        });
    });
}

//Update user with specific id
export function updateUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE user SET name = ?, description = ?, picture_uri = ?, email = ?, password = ? WHERE id = ?`,
            [user.name, user.description, user.picture_uri, user.email, user.password, user.id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            }
        );
    });
}

export function deleteUser(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM user WHERE id = ?`, [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}