import express from 'express';
import * as uploadService from '../services/upload';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

router.post('/recipe', (req, res) => {
    if (req.files.picture && req.files) {
        uploadService.saveFile(req.files.picture).then(result => {
            res.status(200).json(result);
        }).catch(err => {
            errorHandler(err, req, res);
        });
    } else {
        errorHandler(new Error("No File Uploaded"), req, res);
    }
});


export { router as pictureController };
