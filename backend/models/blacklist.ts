import { generateUUID } from '../util/uuid';
import { db } from './db';
export interface JWTBlacklistItem {
    id: string;
    jwt: string;
}

export function addJWTToBlacklist(jwt: string): Promise<{}> {
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