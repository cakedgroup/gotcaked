import { db } from "./db";

/**
 * Get count of rows in table
 * @param tableName table name
 * @returns Promise with number of rows
 */
export function getCounterTable(tableName: string): Promise<Number> {
    const queryString = "SELECT COUNT(*) AS counter FROM " + tableName;
    return new Promise((resolve, reject) => {
        db.all(queryString, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0].counter as Number);
            }
        })
    })
}