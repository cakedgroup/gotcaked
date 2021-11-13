import express from "express";
import { getCurrentStatus } from "../services/status";
const router = express.Router();

router.get('/', (req, res) => {
    getCurrentStatus().then(status => {
        res.status(200).json(status);
    }).catch(err => {
        res.status(500).send();
    })
});


export { router as statusController };
