import express from "express";
import { getCounter } from "../services/status";
import { getVersion } from "../util/version";
const router = express.Router();

router.get('/', (req, res) => {
    let tables = ["user", "recipe", "tag"];

    Promise.all([getCounter(tables[0]), getCounter(tables[1]), getCounter(tables[2])]).then(counter => {
        //Build JSON Object
        let status = {
            "version": getVersion(),
            "userCount": counter[0],
            "recipeCount": counter[1],
            "commentsCount": "-",
            "tagsCount": counter[2],
            "categoriesCount": "-"
        }

        //Response
        res.status(200);
        res.json(status);
    }).catch(err => {
        console.log(err);
    });
});


export { router as statusController };
