import * as bcrypt from 'bcrypt';
import { User, UserPublic } from "../models/user";
import * as userDAO from "../storage/user";
import * as statusDAO from "../storage/status";
import { userTransformer } from '../util/transformer';

export function createUser(user: User): Promise<UserPublic> {
    //Default Role
    user.role = "user";

    //Create User
    return new Promise((resolve, reject) => {
        //BCrypt User´s Password
        bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
            //Check for First User to create Admin
            statusDAO.getCounterTable("user").then(counter => {
                if (counter === 0) {
                    user.role = "admin";
                }
            }).finally(() => {
                //Save User in DB
                userDAO.createUser(user).then(user => resolve(userTransformer(user))).catch(() => reject(new Error("User already exists")));
            });
        });
    });
};

export function getAllUsers(limit: number, offset: number): Promise<UserPublic[]> {
    return new Promise((resolve, reject) => {
        //Get All Users from DB
        userDAO.getAllUsers(limit, offset).then(users => resolve(users.map(user => userTransformer(user)))).catch(() => reject(new Error("No users found")));
    });
}

export function getUserById(id: string): Promise<UserPublic> {
    return new Promise((resolve, reject) => {
        //Get User from DB
        userDAO.getUserById(id).then(user => resolve(userTransformer(user))).catch(() => reject(new Error("User not found")));
    });
}

export function updateUser(id: string, newUser: User): Promise<UserPublic> {
    return new Promise((resolve, reject) => {
        userDAO.getUserById(id).then(user => {
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
            userDAO.updateUser(user).then(user => resolve(userTransformer(user))).catch(() => reject(new Error("Error Updating User")));
        }).catch(() => reject(new Error("User not found")));
    });

}

export function deleteUser(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        //Check if User exists
        userDAO.getUserById(id).then(user => {
            if (user) {
                if (user.role === "admin") {
                    reject(new Error("Admin can´t be deleted"));
                } else {
                    //Delete User from DB
                    userDAO.deleteUser(id).then(() => resolve(true)).catch(() => reject(new Error("Error Deleting User")));
                }
            } else {
                reject(new Error("User not found"));
            }
        }).catch(() => reject(new Error("User not found")));
    });
}