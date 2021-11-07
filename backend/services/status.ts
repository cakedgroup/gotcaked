import { getCounterTable } from "../models/status";

export function getCounter(table: string): Promise<Number> {
    return new Promise((resolve, reject) => {
        getCounterTable(table).then(counter => {
            resolve(counter);
        }).catch(err => {
            reject(err);
        });
    });
}