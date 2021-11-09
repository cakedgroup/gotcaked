import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getUserByEmail, UserLogin } from "../models/user";

export interface loginResponse {
    token: string | undefined;
    status: string;
}

export function login(userCredentials: UserLogin): Promise<loginResponse> {
    return new Promise((resolve, reject) => {
        //Get User from DB to check Credentials
        getUserByEmail(userCredentials.email).then(user => {
            //BCrypt Current Password
            bcrypt.compare(userCredentials.password, user.password).then(result => {
                if (result) {
                    //TODO Create JWT Token
                    //TODO Change Params to User Object
                    //OUTSOURCE Secret to .env
                    jwt.sign({ user }, 'secret', { expiresIn: '24h' }, (err, token) => {
                        if (err) {
                            reject(err);
                        } else {
                            let response: loginResponse = {
                                token: token,
                                status: 'success'
                            };
                            resolve(response);
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