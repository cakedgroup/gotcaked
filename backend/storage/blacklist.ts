import { generateUUID } from '../util/uuid';
import { db } from './db';

/**
 * Add a new entry to the blacklist.
 * @param jwt jwt to add to the blacklist
 * @returns Promise with jwt
 */
export function addJWTToBlacklist(jwt: string): Promise<string> {
    let id: string = generateUUID();
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO jwt_blacklist (id, jwt) VALUES (?,?)`, [id, jwt],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(jwt);
                }
            }
        );
    });
}

/**
 * Check if a jwt is blacklisted.
 * @param jwt jwt to check
 * @returns Promise with boolean
 */
export function isJWTBlacklisted(jwt: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM jwt_blacklist WHERE jwt = ?`, [jwt],
            function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row !== undefined);
                }
            }
        );
    });
}