import { User } from "../models/user";
import { sqlPager } from "../util/sql";
import { generateUUID } from "../util/uuid";
import { db } from './db';

/**
 * Create a new user in database
 * @param user user to create
 * @returns Promise with the created user
 */
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

/**
 * Get user by name from database
 * @param name name of the user
 * @returns Promise with the user
 */
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

/**
 * Get random user from database
 * @returns Promise with the user
 */
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

/**
 * Get user by id from database
 * @param id id of the user
 * @returns Promise with the user
 */
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

/**
 * Get user by email from database
 * @param email email of the user
 * @returns Promise with the user
 */
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

/**
 * Get all users from database
 * @param limit (optional) limit of users to return
 * @param offset (optional) offset of users to return
 * @returns Promise with the users
 */
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

/**
 * Update user in database
 * @param user user to update
 * @returns Promise with the updated user
 */
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

/**
 * Delete user by id from database
 * @param id id of the user
 * @returns 
 */
export function deleteUser(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM user WHERE id = ?`, [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}