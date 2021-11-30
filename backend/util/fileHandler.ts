import * as fs from 'fs';

export function deleteUserPicture(pictureURI: string): boolean {
    //Get ID with FileExtension
    const pictureID = pictureURI.split("/").pop();

    //Delete File
    fs.unlink('./static/img/users/' + pictureID, (err) => {
        if (err) {
            console.log(err);
            return false;
        }
    });
    return true;
}