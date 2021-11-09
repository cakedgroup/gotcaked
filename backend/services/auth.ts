import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getUserByEmail, UserLogin } from "../models/user";
import { getSecret } from '../util/secret';
import { jwtContentTransformer } from '../util/transformer';
import { addJWTToBlacklist } from '../models/blacklist';

export interface jwtContent {
    id: string;
    email: string;
}

export function login(userCredentials: UserLogin): Promise<{}> {
    return new Promise((resolve, reject) => {
        //Get User from DB to check Credentials
        getUserByEmail(userCredentials.email).then(user => {
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
                    reject({ status: 'Password don´t match.' });
                }
            }).catch(() => reject({ status: 'Server Error' }));
        }).catch(() => reject({ status: 'User does not exist.' }));
    });
}

export function logout(jwtKey: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        addJWTToBlacklist(jwtKey).then(() => resolve({ status: 'success' })).catch(() => reject({ status: 'Server Error' }));
    });
}