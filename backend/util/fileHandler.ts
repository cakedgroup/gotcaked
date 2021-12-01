import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';
import { generateUUID } from './uuid';

export function deleteFile(pictureURI: string, type: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        //Get ID with FileExtension
        const pictureID = pictureURI.split("/").pop();
        let filePath = getTypeFilePath(type) + pictureID;

        //Delete File
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
                reject(false);
            }
            resolve(true);
        });
    });
}

export function saveFile(file: UploadedFile, type: string): Promise<string> {
    return new Promise((resolve, reject) => {
        //Create UUID
        const uuid = generateUUID();
        const fileTyp = file.name.split('.').pop();
        let filePath = getTypeFilePath(type) + uuid + "." + fileTyp;
        let endpointPath = getTypeEndpointPath(type) + uuid + "." + fileTyp;

        //Save File with UUID
        file.mv(filePath).then(() => {
            resolve(endpointPath);
        }).catch(err => {
            reject(err);
        });
    });
}

function getTypeFilePath(type: string): string {
    if (type === "user") {
        return "./static/img/users/";
    } else if (type === "recipe") {
        return "./static/img/recipes/";
    } else {
        return "./static/img/unknown/";
    }
}

function getTypeEndpointPath(type: string): string {
    if (type === "user") {
        return "/files/img/users/";
    } else if (type === "recipe") {
        return "/files/img/recipes/";
    } else {
        return "/files/img/unknown/";
    }
}