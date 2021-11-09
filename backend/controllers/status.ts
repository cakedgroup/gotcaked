import express from "express";
import { getCurrentStatus } from "../services/status";
const router = express.Router();

router.get('/', (req, res) => {

    getCurrentStatus().then(status => {
        res.status(200);
        res.json(status);
    }).catch(err => {
        res.status(500);
        res.send();
        console.log(err);
    })
});


export { router as statusController };
