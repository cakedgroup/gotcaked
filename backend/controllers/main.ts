import express from "express";
import { getVersion } from "../util/version";

const router = express.Router();

// @route   GET api/
// @desc    Get welcome message
// @access  Public
router.get('/', (req: express.Request, res: express.Response) => {
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


export { router as welcomeController }