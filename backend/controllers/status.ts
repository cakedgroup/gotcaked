import express from "express";
import { getVersion } from "../util/version";
const router = express.Router();

router.get('/', (req, res) => {
    //Build JSON Object
    let status = {
        "version": getVersion(),
        "userCount": "-",
        "recipeCount": "-",
        "commentsCount": "-",
        "tagsCount": "-",
        "categoriesCount": "-"
    }

    //Response
    res.status(200);
    res.json(status);
});


export { router as statusController };
