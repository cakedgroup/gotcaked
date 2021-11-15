import { db } from "./db";


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