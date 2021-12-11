
import { getCounterTable } from "../storage/status";
import { getVersion } from "../util/version";

/**
 * Get the status of the server. (e.g. version, userCount, recipeCount etc.)
 * @returns Promise with the status of the server
 */
export function getCurrentStatus(): Promise<any> {
    let tables = ["user", "recipe", "tag"];
    return new Promise((resolve, reject) => {
        Promise.all([getCounterTable(tables[0]), getCounterTable(tables[1]), getCounterTable(tables[2])]).then(counter => {
            let status = {
                "version": getVersion(),
                "userCount": counter[0],
                "recipeCount": counter[1],
                "commentsCount": "-",
                "tagsCount": counter[2],
                "categoriesCount": "-"
            }
            resolve(status);
        }).catch(err => {
            reject(err);
        });
    });
}