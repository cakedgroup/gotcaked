import { db } from './db';
import { generateUUID } from "../util/uuid";
import { sqlPager } from '../util/sql';
import { Ingredient, Rating, Recipe, RecipePicture } from '../models/recipe';



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
                        ingredients: [],
                        picture_uri: []
                    };
                    resolve(recipe);
                } else {
                    reject(new Error("Recipe not found"));
                }
            }
        });
    });
}

export function getRandomRecipe(categoryId?: string, tagId?: string): Promise<Recipe> {
    let sql = "SELECT * FROM recipe WHERE id IN (SELECT id FROM recipe ";
    if (categoryId && tagId) {
        sql += "WHERE category_id = '" + categoryId + "' AND tag_id = '" + tagId + "' ORDER BY RANDOM() LIMIT 1)";
    } else if (tagId) {
        sql += "WHERE tag_id = '" + tagId + "' ORDER BY RANDOM() LIMIT 1)";
    } else if (categoryId) {
        sql += "WHERE category_id = '" + categoryId + "' ORDER BY RANDOM() LIMIT 1)";
    } else {
        sql += "ORDER BY RANDOM() LIMIT 1)";
    }

    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
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
                        ingredients: [],
                        picture_uri: []
                    };
                    resolve(recipe);
                } else {
                    reject(new Error("Recipe not found"));
                }
            }
        });
    });
}

export function getRecipes(limit?: number, offset?: number): Promise<Recipe[]> {
    let query: string = "SELECT * FROM recipe";
    query = sqlPager(query, limit, offset);

    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
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
                        ingredients: [],
                        picture_uri: []
                    };
                    recipes.push(recipe);
                });
                resolve(recipes);
            }
        });
    });
}

export function getRecipesByCategory(categoryId: string, limit?: number, offset?: number): Promise<Recipe[]> {

    let query: string = "SELECT * FROM recipe WHERE category_id = ?";
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

export function getRecipesByTag(tagId: string, limit?: number, offset?: number): Promise<Recipe[]> {
    let query: string = "SELECT * FROM recipe r JOIN recipe_tag rt ON r.id = rt.recipe_id WHERE rt.tag_id = ?";
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

export function createRating(rating: Rating): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO rating (user_id, recipe_id, vote) VALUES (?, ?, ?)`,
            [rating.user_id, rating.recipe_id, rating.vote],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
}

export function updateRating(rating: Rating): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE rating SET vote = ? WHERE user_id = ? AND recipe_id = ?`,
            [rating.vote, rating.user_id, rating.recipe_id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
}

export function deleteRating(userId: string, recipeId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM rating WHERE user_id = ? AND recipe_id = ?`, [userId, recipeId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function getUserRecipeRating(userId: string, recipeId: string): Promise<Rating> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM rating WHERE user_id = ? AND recipe_id = ?`, [userId, recipeId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    resolve(row);
                } else {
                    reject(new Error("Rating not found"));
                }
            }
        });
    });
}

export function getRecipeRating(recipeId: string): Promise<number> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT SUM(vote) AS rating FROM rating WHERE recipe_id = ?`, [recipeId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    resolve(row);
                } else {
                    reject(new Error("Recipe not found"));
                }
            }
        });
    });
}

export function createPicture(pictureId: string, recipeId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO recipe_picture (recipe_id, picture_id) VALUES (?, ?, ?)`,
            [pictureId, recipeId],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
}

export function getPicturesFromRecipe(recipeId: string): Promise<RecipePicture[]> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM recipe_picture WHERE recipe_id = ?`, [recipeId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let picture: RecipePicture[] = [];
                rows.forEach((row: RecipePicture) => {
                    picture.push(row);
                });
                resolve(picture);
            }
        });
    });
}

export function deletePictureFromRecipe(pictureId: string, recipeId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM recipe_picture WHERE picture_id = ? AND recipe_id = ?`, [pictureId, recipeId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function deleteAllPicturesFromRecipe(recipeId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM recipe_picture WHERE recipe_id = ?`, [recipeId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}