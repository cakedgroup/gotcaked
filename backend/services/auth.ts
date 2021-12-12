import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as blacklistDAO from '../storage/blacklist';
import * as userDAO from "../storage/user";
import { getSecret } from '../util/secret';
import { UserLogin } from '../models/user';
import { jwtContentTransformer } from '../util/transformer';

/**
 * Login with email and password and return a JWT token if successful
 * @param userCredentials Credentials of the user
 */
export function login(userCredentials: UserLogin): Promise<{}> {
    return new Promise((resolve, reject) => {
        //Get User from DB to check Credentials
        userDAO.getUserByEmail(userCredentials.email).then(user => {
            //BCrypt Current Password
            bcrypt.compare(userCredentials.password, user.password).then(result => {
                if (result) {
                    //Create JWT Token with Exp, Secret and Content
                    jwt.sign(jwtContentTransformer(user), getSecret(), { expiresIn: '24h' }, (err, token) => {
                        if (err) {
                            reject(err);
                        } else {
                            //Return Token and Status
                            resolve({ token: token, status: 'success' });
                        }
                    });
                } else {
                    //Failed Password Compare
                    reject(new Error("Credentials not found"));
                }
            }).catch(() => reject(new Error("Server Error")));
        }).catch(() => reject(new Error("Credentials not found")));
    });
}

/**
 * Add JWT token to blacklist to prevent further use
 * @param jwtKey JWT Token
 */
export function logout(jwtKey: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        if (!jwtKey) { reject(new Error("No JWT Key")) };
        blacklistDAO.addJWTToBlacklist(jwtKey).then(() => resolve({ status: 'success' })).catch(() => reject(new Error("Server Error")));
    });
}