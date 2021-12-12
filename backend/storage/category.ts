import { Category } from '../models/category';
import { db } from './db';

/**
 * Create new category in database
 * @param category category to create
 * @returns Promise with created category
 */
export function createCategory(category: Category): Promise<Category> {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO Category (name, description) VALUES (?, ?)`, [category.name, category.description], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(category);
            }
        });
    });
}

/**
 * Get category by name from database
 * @param name name of category
 * @returns Promise with category
 */
export function getCategory(name: string): Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
        db.get(`SELECT * FROM Category WHERE name = ?`, [name], (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            //Check if Category exists
            if (row) {
                let category: Category = {
                    name: row.name,
                    description: row.description,
                };
                resolve(category);
            } else {
                reject(new Error(`Category not found`));
            }
        });
    });
}

/**
 * Get all categories from database
 * @returns Promise with all categories
 */
export function getCategorys(): Promise<Category[]> {
    return new Promise<Category[]>((resolve, reject) => {
        db.all(`SELECT * FROM Category`, (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            let categorys: Category[] = [];
            for (let row of rows) {
                let category: Category = {
                    name: row.name,
                    description: row.description,
                };
                categorys.push(category);
            }
            resolve(categorys);
        });
    });
}

/**
 * Update category in database
 * @param name name of category
 * @param newCategory updated category
 * @returns Promise with updated category
 */
export function updateCategory(name: string, newCategory: Category): Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
        db.run(`UPDATE Category SET name = ?, description = ? WHERE name = ?`, [newCategory.name, newCategory.description, name], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(getCategory(newCategory.name));
            }
        });
    });
}

/**
 * Delete category in database
 * @param name name of category
 * @returns empty Promise
 */
export function deleteCategory(name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`DELETE FROM Category WHERE name = ?`, [name], (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
