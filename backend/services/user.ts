import * as bcrypt from "bcrypt";
import fileUpload from 'express-fileupload';
import { User, UserPublic } from "../models/user";
import * as blacklistDAO from '../storage/blacklist';
import * as statusDAO from "../storage/status";
import * as userDAO from "../storage/user";
import * as fileHandler from '../util/fileHandler';
import { userTransformer } from '../util/transformer';

/**
 * Create a new user
 * @param user user to create
 * @returns Promise with the created user
 */
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
}

/**
 * Get all users
 * @param limit limit of users to get
 * @param offset offset of users to get
 * @returns Promise with the users
 */
export function getAllUsers(limit: number, offset: number): Promise<UserPublic[]> {
  return new Promise((resolve, reject) => {
    //Get All Users from DB
    userDAO.getAllUsers(limit, offset).then((users) => resolve(users.map((user) => userTransformer(user)))).catch(() => reject(new Error("No users found")));
  });
}

/**
 * Get a user by id
 * @param id id of the user to get
 * @returns Promise with the user
 */
export function getUserById(id: string): Promise<UserPublic> {
  return new Promise((resolve, reject) => {
    //Get User from DB
    userDAO.getUserById(id).then((user) => resolve(userTransformer(user))).catch(() => reject(new Error("User not found")));
  });
}

/**
 * Get a random user
 * @returns Promise with the user
 */
export function getRandomUser(): Promise<UserPublic> {
  return new Promise((resolve, reject) => {
    //Get Random User from DB
    userDAO.getRandomUser().then((user) => resolve(userTransformer(user))).catch(() => reject(new Error("User not found")));
  });
}

/**
 * Update a user by id
 * @param id id of the user to update
 * @param newUser updated user
 * @returns Promise with the updated user
 */
export function updateUser(id: string, newUser: User): Promise<UserPublic> {
  return new Promise((resolve, reject) => {
    userDAO.getUserById(id).then((user) => {
      //Check Values
      user.name = newUser.name || user.name;
      user.description = newUser.description || user.description;
      user.email = newUser.email || user.email;

      //Check Password
      if (newUser.password) {
        console.log("Password changed");
        bcrypt.hash(newUser.password, 10).then((hash) => {
          user.password = hash
          userDAO.updateUser(user).then((user) => resolve(userTransformer(user))).catch(() => reject(new Error("Error Updating User")));
          return;
        });
      }
      //Update User in DB
      userDAO.updateUser(user).then((user) => resolve(userTransformer(user))).catch(() => reject(new Error("Error Updating User")));
    }).catch(() => reject(new Error("User not found")));
  });
}

/**
 * Set Profile Picture of a user
 * @param userID user to set profile picture
 * @param picture picture to set
 * @returns Promise with the updated user
 */
export function setPicture(userID: string, picture: fileUpload.UploadedFile): Promise<UserPublic> {
  return new Promise((resolve, reject) => {
    userDAO.getUserById(userID).then((user) => {
      if (user.picture_uri !== null) {
        //Delete Old Picture to prevent storing old pictures
        fileHandler.deleteFile(user.picture_uri, "user");
      }
      //Save Picture in Filesystem
      fileHandler.saveFile(picture, "user").then((picture_uri) => {
        user.picture_uri = picture_uri;
        //Update User in DB
        userDAO.updateUser(user).then(() => {
          resolve(userTransformer(user));
        }).catch(() => reject(new Error("Error Updating User")));
      }).catch(() => reject(new Error("Error Saving Picture")));
    }).catch(() => reject(new Error("User not found")));
  });
}

/**
 * Delete a profile picture of a user
 * @param userID user to delete profile picture
 * @returns User with no profile picture
 */
export function deletePicture(userID: string): Promise<UserPublic> {
  return new Promise((resolve, reject) => {
    userDAO.getUserById(userID).then((user) => {
      if (user.picture_uri !== null) {
        //Delete Picture from Filesystem
        fileHandler.deleteFile(user.picture_uri, "user").then(() => {
          //@ts-ignore - TS doesn't know about the picture_uri property
          user.picture_uri = null;
          //Update User in DB
          userDAO.updateUser(user).then(() => {
            resolve(userTransformer(user));
          }).catch(() => reject(new Error("Error Updating User")));
        }).catch(() => reject(new Error("Error Deleting Picture")));
      } else {
        resolve(user);
      }
    }).catch(() => reject(new Error("User not found")));
  });
}

/**
 * Delete a user by id
 * @param id id of the user to delete
 * @param blockJWT should the JWT be blocked
 * @param jwtToken jwt of the user
 * @returns empty Promise
 */
export function deleteUser(id: string, blockJWT: boolean, jwtToken?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    //Check if User exists
    userDAO.getUserById(id).then(user => {
      if (user) {
        if (user.role === "admin") {
          reject(new Error("Admin can´t be deleted"));
        } else {
          //Delete User Picture from filesystem 
          if (user.picture_uri !== null) {
            fileHandler.deleteFile(user.picture_uri, "user").catch(err => new Error(err));
          }

          //Delete User from DB
          userDAO.deleteUser(id).then(() => {
            //Blacklist JWT Token
            if (jwtToken && blockJWT) {
              blacklistDAO.addJWTToBlacklist(jwtToken);
            }

            resolve()
          }).catch(() => reject(new Error("Error Deleting User")));
        }
      } else {
        reject(new Error("User not found"));
      }
    }).catch(() => reject(new Error("User not found")));
  });
}
