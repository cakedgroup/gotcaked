import {db} from './db';
import { generateUUID } from "../util/uuid";
import { Tag } from './tag';

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    preparation: string;
    createdAt: Date;
    difficulty: string;
    time: Number;
    category_id: string;
    user_id: string;
}

export function createRecipe(recipe: Recipe): Promise<Recipe> {
    const newId = generateUUID();
    const createdAt: Date = new Date();
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO recipe (id, name, description, ingredients, preparation, createdAt, difficulty, time. category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [newId, recipe.name, recipe.description, recipe.ingredients, recipe.preparation, createdAt, recipe.difficulty, recipe.time, recipe.category_id, recipe.user_id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(recipe);
                }
            });
    });
}

export function getRecipe(id: string): Promise<Recipe> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM recipe WHERE id = ?`, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    resolve(row);
                }else {
                    reject(new Error("Recipe not found"));
                }
            }
        });
    });
}

export function getRecipes(): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM recipe`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export function deleteRecipe(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM recipe WHERE id = ?`, [id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
