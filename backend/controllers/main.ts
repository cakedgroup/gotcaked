import express from "express";
import {getVersion} from "../util/version";

const router = express.Router();

router.get('/', (req, res) => {
    //Build JSON Object
    let welcome = {
        "message": "Welcome to our backend!",
        "version": getVersion(),
        "status": "/status"
    }

    //Response
    res.status(200);
    res.json(welcome);
});


export {router as welcomeController}