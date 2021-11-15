import * as bcrypt from 'bcrypt';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, User, UserPublic } from "../models/user";
import { userTransformer } from '../util/transformer';

export function createUserService(user: User): Promise<UserPublic> {
    return new Promise((resolve, reject) => {
        //BCrypt User´s Password
        bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
            //Save User in DB
            createUser(user).then(user => resolve(userTransformer(user))).catch(() => reject(new Error("User already exists")));
        });
    });
};

export function getAllUsersService(limit: number, offset: number): Promise<UserPublic[]> {
    return new Promise((resolve, reject) => {
        //Get All Users from DB
        getAllUsers(limit, offset).then(users => resolve(users.map(user => userTransformer(user)))).catch(() => reject(new Error("No users found")));
    });
}

export function getUserByIdService(id: string): Promise<UserPublic> {
    return new Promise((resolve, reject) => {
        //Get User from DB
        getUserById(id).then(user => resolve(userTransformer(user))).catch(() => reject(new Error("User not found")));
    });
}

export function updateUserService(id: string, newUser: User): Promise<UserPublic> {
    return new Promise((resolve, reject) => {
        getUserById(id).then(user => {
            //Check Values
            user.name = newUser.name || user.name;
            user.description = newUser.description || user.description;
            user.picture_uri = newUser.picture_uri || user.picture_uri;
            user.email = newUser.email || user.email;

            //Check Password
            if (newUser.password) {
                bcrypt.hash(newUser.password, 10).then(hash => user.password = hash);
            }

            //Update User in DB
            updateUser(user).then(user => resolve(userTransformer(user))).catch(() => reject(new Error("Error Updating User")));
        }).catch(() => reject(new Error("User not found")));
    });

}

export function deleteUserService(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        //Check if User exists
        getUserById(id).then(user => {
            if (user) {
                //Delete User from DB
                deleteUser(id).then(() => resolve(true)).catch(() => reject(new Error("Error Deleting User")));
            } else {
                reject(new Error("User not found"));
            }
        }).catch(() => reject(new Error("User not found")));
    });
}