import express from "express";
import * as statusService from "../services/status";
const router = express.Router();

router.get('/', (req, res) => {
    statusService.getCurrentStatus().then(status => {
        res.status(200).json(status);
    }).catch(err => {
        res.status(500).send();
    })
});


export { router as statusController };
