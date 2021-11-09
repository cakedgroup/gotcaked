import * as bcrypt from 'bcrypt';
import { createUser, User, UserPublic } from "../models/user";
import { userTransformer } from '../util/transformer';

export function createUserService(user: User): Promise<UserPublic> {
    return new Promise((resolve, reject) => {
        //BCrypt User´s Password
        bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
            //Save User in DB
            createUser(user).then(user => resolve(userTransformer(user))).catch(err => reject(err));
        });
    });
};