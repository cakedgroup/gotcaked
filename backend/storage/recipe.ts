import {db} from './db';
import { generateUUID } from "../util/uuid";
import { sqlPager } from '../util/sql';
import { Ingredient, Recipe } from '../models/recipe';



export function createRecipe(recipe: Recipe): Promise<Recipe> {
    recipe.id = generateUUID();
    const createdAt: Date = new Date();
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO recipe (id, name, description, preparation, createdAt, difficulty, time, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?)`,
            [recipe.id, recipe.name, recipe.description, recipe.preparation, createdAt, recipe.difficulty, recipe.time, recipe.category_id, recipe.user_id],
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
                    let recipe: Recipe = {
                        id: row.id,
                        name: row.name,
                        description: row.description,
                        preparation: row.preparation,
                        createdAt: row.createdAt,
                        difficulty: row.difficulty,
                        time: row.time,
                        category_id: row.category_id,
                        user_id: row.user_id,
                        tags: [],
                        ingredients: []
                    };
                    resolve(recipe);
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
                    let recipe: Recipe = {
                        id: row.id,
                        name: row.name,
                        description: row.description,
                        preparation: row.preparation,
                        createdAt: row.createdAt,
                        difficulty: row.difficulty,
                        time: row.time,
                        category_id: row.category_id,
                        user_id: row.user_id,
                        tags: [],
                        ingredients: []
                    };
                    recipes.push(recipe);
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

export function updateRecipe(recipe: Recipe): Promise<Recipe> {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE recipe SET name = ?, description = ?, preparation = ?, difficulty = ?, time = ?, category_id = ?, user_id = ? WHERE id = ?`,
            [recipe.name, recipe.description, recipe.preparation, recipe.difficulty, recipe.time, recipe.category_id, recipe.user_id, recipe.id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(recipe);
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
                    let ingredient: Ingredient = {
                        id: row.id,
                        name: row.name,
                        amount: row.amount,
                        unit: row.unit,
                        recipe_id: row.recipe_id
                    };
                    ingredients.push(ingredient);
                });
                resolve(ingredients);
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