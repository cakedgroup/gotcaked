
import { getCounterTable } from "../storage/status";
import { getVersion } from "../util/version";

export function getCurrentStatus(): Promise<any> {
    let tables = ["user", "recipe", "comment", "tag", "category"];
    return new Promise((resolve, reject) => {
        Promise.all([getCounterTable(tables[0]), getCounterTable(tables[1]), getCounterTable(tables[2]), getCounterTable(tables[3]), getCounterTable(tables[4])]).then(counter => {
            let status = {
                "version": getVersion(),
                "userCount": counter[0],
                "recipeCount": counter[1],
                "commentsCount": counter[2],
                "tagsCount": counter[3],
                "categoriesCount": counter[4]
            }
            resolve(status);
        }).catch(err => {
            reject(err);
        });
    });
}