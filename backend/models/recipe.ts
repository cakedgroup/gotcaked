import {db} from './db';
import { generateUUID } from "../util/uuid";
import { Tag } from './tag';
import { sqlPager } from '../util/sql';

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    preparation: string;
    createdAt: Date;
    difficulty: string;
    time: Number;
    category_id: string;
    user_id: string;
}

export interface Ingredient {
    id: string;
    name: string;
    amount: string;
    unit: string;
    recipe_id: string;
}

export function createRecipe(recipe: Recipe): Promise<Recipe> {
    const newId = generateUUID();
    const createdAt: Date = new Date();
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO recipe (id, name, description, preparation, createdAt, difficulty, time, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?)`,
            [newId, recipe.name, recipe.description, recipe.preparation, createdAt, recipe.difficulty, recipe.time, recipe.category_id, recipe.user_id],
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
                let recipes: Recipe[] = [];
                rows.forEach((row) => {
                    recipes.push(row);
                });
                resolve(recipes);
            }
        });
    });
}

export function getRecipesByCategory(categoryId: string, limit?:number, offset?: number): Promise<Recipe[]> {

    let query : string = "SELECT * FROM recipe WHERE category_id = ?";
    query = sqlPager(query, limit, offset);
    
    return new Promise((resolve, reject) => {
        db.all(query, [categoryId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let recipes: Recipe[] = [];
                rows.forEach((row) => {
                    recipes.push(row);
                });
                resolve(recipes);
            }
        });
    });
}

export function getRecipesByTag(tagId: string, limit?:number, offset?: number): Promise<Recipe[]> {
    let query : string = "SELECT * FROM recipe r JOIN recipe_tag rt ON r.id = rt.recipe_id WHERE rt.tag_id = ?";
    query = sqlPager(query, limit, offset);

    return new Promise((resolve, reject) => {
        db.all(query, [tagId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let recipes: Recipe[] = [];
                rows.forEach((row) => {
                    recipes.push(row);
                });
                resolve(recipes);
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

export function createIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const newId = generateUUID();
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO ingredient (id, name, amount, unit, recipe_id) VALUES (?, ?, ?, ?, ?)`,
            [newId, ingredient.name, ingredient.amount, ingredient.unit, ingredient.recipe_id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    ingredient.id = newId;
                    resolve(ingredient);
                }
            });
    });
}

export function getIngredients(recipeId: string): Promise<Ingredient[]> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ingredient WHERE recipe_id = ?`, [recipeId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let ingredients: Ingredient[] = [];
                rows.forEach((row) => {
                    ingredients.push(row);
                });
                resolve(rows);
            }
        });
    });
}

export function deleteIngredient(recipeid: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM ingredient WHERE recipe_id = ?`, [recipeid], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function updateIngredient(ingredient: Ingredient): Promise<Ingredient> {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE ingredient SET name = ?, amount = ?, unit = ? WHERE id = ?`,
            [ingredient.name, ingredient.amount, ingredient.unit, ingredient.id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(ingredient);
                }
            });
    });
}