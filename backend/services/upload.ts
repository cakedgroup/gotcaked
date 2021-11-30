import { UploadedFile } from "express-fileupload";
import { generateUUID } from '../util/uuid';

export function saveFile(file: UploadedFile): Promise<{}> {
    return new Promise((resolve, reject) => {
        //Create UUID
        const uuid = generateUUID();
        const fileTyp = file.name.split('.').pop();

        //Save File with UUID
        file.mv(`./static/img/recipes/${uuid}.${fileTyp}`).then(() => {
            resolve({ picture_id: uuid + "." + fileTyp });
        }).catch(err => {
            reject(err);
        });
    });
}