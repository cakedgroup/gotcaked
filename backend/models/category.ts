import {db} from './db';
import { generateUUID } from "../util/uuid";

export interface Category {
    id: string;
    name: string;
    description: string;
}

export function createCategory(name: string, description: string) : Promise<Category> {
    return new Promise((resolve, reject) => {
        const category: Category = {
            id: generateUUID(),
            name,
            description,
        };
        db.run(`INSERT INTO Category (id, name, description) VALUES (?, ?, ?)`, [category.id, category.name, category.description], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(category);
            }
        });
    });
}

export function getCategory(name: string) : Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
        db.get(`SELECT * FROM Category WHERE name = ?`, [name], (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            //Check if Category exists
            if (row) {
                let category : Category = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                };
                resolve(category);
            }else{
                reject(new Error(`Category ${name} not found`));
            }
        });
    });
}

export function getCategorys() : Promise<Category[]> {
    return new Promise<Category[]>((resolve, reject) => {
        db.all(`SELECT * FROM Category`, (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            let categorys : Category[] = [];
            for (let row of rows) {
                let category : Category = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                };
                categorys.push(category);
            }
            resolve(categorys);
        });
    });
}

export function updateCategory(name: string, description: string) : Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
        db.run(`UPDATE Category SET description = ? WHERE name = ?`, [description, name], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(getCategory(name));
            }
        });
    });
}

export function deleteCategory(name: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`DELETE FROM Category WHERE name = ?`, [name], (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve();
        });
    });
}
