import { Ingredient, Rating, RatingCount, Recipe, RecipePicture } from '../models/recipe';
import { sqlPager } from '../util/sql';
import { generateUUID } from "../util/uuid";
import { db } from './db';

/**
 * Create a new recipe in database
 * @param recipe recipe to create 
 * @returns Promise with the created recipe
 */
export function createRecipe(recipe: Recipe): Promise<Recipe> {
    recipe.id = generateUUID();
    const createdAt: Date = new Date();
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO recipe (id, name, description, preparation, createdAt, difficulty, time, category_name, user_id) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?)`,
            [recipe.id, recipe.name, recipe.description, recipe.preparation, createdAt, recipe.difficulty, recipe.time, recipe.category_name, recipe.user_id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(recipe);
                }
            });
    });
}

/**
 * Get a recipe by id from database
 * @param id id of the recipe to get
 * @returns Promise with the recipe
 */
export function getRecipe(id: string): Promise<Recipe> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM recipe WHERE id = ?`, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    convertRowToRecipe(row).then((recipe) => {
                        resolve(recipe);
                    });
                } else {
                    reject(new Error("Recipe not found"));
                }
            }
        });
    });
}

/**
 * Get random recipe from database
 * @param categoryId (optional) id of the category to filter recipe
 * @param tagId (optional) id of the tag to filter recipe
 * @returns Promise with the recipe
 */
export function getRandomRecipe(categoryId?: string, tagId?: string): Promise<Recipe> {
    let sql = "SELECT * FROM recipe WHERE id IN ";
    if (categoryId && tagId) {
        sql += "((SELECT id FROM recipe WHERE category_name = '" + categoryId + "') UNION (SELECT recipe_id FROM recipe_tag WHERE tag_name = '" + tagId + "') ORDER BY RANDOM() LIMIT 1)";
    } else if (tagId) {
        sql += "(SELECT recipe_id FROM recipe_tag WHERE tag_name = '" + tagId + "' ORDER BY RANDOM() LIMIT 1)";
    } else if (categoryId) {
        sql += "(SELECT id FROM recipe WHERE category_name = '" + categoryId + "' ORDER BY RANDOM() LIMIT 1)";
    } else {
        sql += "(SELECT id FROM recipe ORDER BY RANDOM() LIMIT 1)";
    }

    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    convertRowToRecipe(row).then((recipe) => {
                        resolve(recipe);
                    });
                } else {
                    reject(new Error("Recipe not found"));
                }
            }
        });
    });
}

/**
 * Get all recipes from user in database
 * @param userId user id to filter recipes
 * @returns Promise with the recipes
 */
export function getRecipesFromUser(userId: string): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM recipe WHERE user_id = ?`, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (rows) {
                    convertRowsToRecipes(rows).then((recipes) => {
                        resolve(recipes);
                    });
                } else {
                    reject(new Error("Recipe not found"));
                }
            }
        });
    });
}

/**
 * Get all liked recipes from user in database
 * @param userId user id to filter recipes
 * @returns Promise with the recipes
 */
export function getLikedRecipesFromUser(userId: string): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM recipe WHERE id IN (SELECT recipe_id FROM rating WHERE user_id = ? AND vote = 1)`, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (rows) {
                    convertRowsToRecipes(rows).then(recipes => {
                        resolve(recipes);
                    });
                } else {
                    reject(new Error("Recipe not found"));
                }
            }
        });
    });
}

/**
 * Get all recipes from database
 * @param limit (optional) limit of recipes to get
 * @param offset (optional) limit of recipes to get
 * @returns Promise with the recipes
 */
export function getRecipes(limit?: number, offset?: number): Promise<Recipe[]> {
    let query: string = "SELECT * FROM recipe";
    query = sqlPager(query, limit, offset);

    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                convertRowsToRecipes(rows).then((allRecipes) => {
                    resolve(allRecipes);
                });
            }
        });
    });
}

/**
 * Get all recipes with category from database
 * @param category_name category name to filter recipes 
 * @param limit (optional) limit of recipes to get
 * @param offset (optional) offset of recipes to get
 * @returns Promise with the recipes
 */
export function getRecipesByCategory(category_name: string, limit?: number, offset?: number): Promise<Recipe[]> {
    let query: string = "SELECT * FROM recipe WHERE category_name = ?";
    query = sqlPager(query, limit, offset);

    return new Promise((resolve, reject) => {
        db.all(query, [category_name], (err, rows) => {
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

/**
 * Get all recipes with tag from database
 * @param tag_name tag name to filter recipes
 * @param limit (optional) limit of recipes to get
 * @param offset (optional) offset of recipes to get
 * @returns 
 */
export function getRecipesByTag(tag_name: string, limit?: number, offset?: number): Promise<Recipe[]> {
    let query: string = "SELECT * FROM recipe r JOIN recipe_tag rt ON r.id = rt.recipe_id WHERE rt.tag_name = ?";
    query = sqlPager(query, limit, offset);

    return new Promise((resolve, reject) => {
        db.all(query, [tag_name], (err, rows) => {
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

/**
 * Update recipe in database
 * @param recipe recipe to update
 * @returns Promise with the updated recipe
 */
export function updateRecipe(recipe: Recipe): Promise<Recipe> {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE recipe SET name = ?, description = ?, preparation = ?, difficulty = ?, time = ?, category_name = ?, user_id = ? WHERE id = ?`,
            [recipe.name, recipe.description, recipe.preparation, recipe.difficulty, recipe.time, recipe.category_name, recipe.user_id, recipe.id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(recipe);
                }
            });
    });
}

/**
 * Delete recipe  by id in database
 * @param id recipe id to delete
 * @returns empty promise
 */
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

/**
 * Create ingredient in database
 * @param ingredient ingredient to create
 * @returns Promise with the created ingredient
 */
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

/**
 * Get all ingredients from recipe in database
 * @param recipeId recipe id to filter ingredients
 * @returns Promise with the ingredients
 */
export function getIngredients(recipe_id: string): Promise<Ingredient[]> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ingredient WHERE recipe_id = ?`, [recipe_id], (err, rows) => {
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

/**
 * 
 * @param recipeId recipe id
 * @param Ingredient_id ingredient id
 * @returns 
 */
export function deleteIngredient(recipe_id: string, ingredient_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM ingredient WHERE recipe_id = ? AND id = ?`, [recipe_id, ingredient_id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Delete all ingredients from recipe in database
 * @param recipeId recipe id
 * @returns empty promise
 */
export function deleteAllIngredients(recipeId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM ingredient WHERE recipe_id = ?`, [recipeId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Update ingredient in database
 * @param ingredient ingredient to update
 * @returns Promise with the updated ingredient
 */
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

/**
 * Create rating in database
 * @param rating rating to create
 * @returns empty promise
 */
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

/**
 * Update rating in database
 * @param rating rating to update
 * @returns empty promise
 */
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

/**
 * Delete rating by user_id and recipe_id in database
 * @param user_id user id
 * @param recipe_id recipe id
 * @returns empty promise
 */
export function deleteRating(user_id: string, recipe_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM rating WHERE user_id = ? AND recipe_id = ?`, [user_id, recipe_id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Delete all ratings from recipe in database
 * @param recipe_id recipe id
 * @returns empty promise
 */
export function deleteAllRatingsFromRecipe(recipe_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM rating WHERE recipe_id = ?`, [recipe_id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Get rating from user and recipe in database
 * @param user_id user id
 * @param recipe_id recipe id
 * @returns Promise with the rating
 */
export function getUserRecipeRating(user_id: string, recipe_id: string): Promise<Rating> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM rating WHERE user_id = ? AND recipe_id = ?`, [user_id, recipe_id], (err, row) => {
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

/**
 * Get RatingCount from recipe in database
 * @param recipe_id rating id
 * @returns Promise with the rating count
 */
export function getRecipeRating(recipe_id: string): Promise<RatingCount> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT SUM(vote) AS rating FROM rating WHERE recipe_id = ?`, [recipe_id], (err, row) => {
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

/**
 * Create picture in database
 * @param recipe_id recipe id
 * @param picture_id picture id
 * @returns empty promise
 */
export function createPicture(recipe_id: string, picture_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO recipe_picture (recipe_id, picture_id) VALUES (?, ?)`, [recipe_id, picture_id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
}

/**
 * Get all pictures from recipe in database
 * @param recipe_id recipe id
 * @returns Promise with the pictures
 */
export function getPicturesFromRecipe(recipe_id: string): Promise<RecipePicture[]> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM recipe_picture WHERE recipe_id = ?`, [recipe_id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

/**
 * Delete picture with recipe id and picture id from database
 * @param recipe_id recipe id
 * @param picture_id picture id
 * @returns empty promise
 */
export function deletePictureFromRecipe(recipe_id: string, picture_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM recipe_picture WHERE picture_id = ? AND recipe_id = ?`, [picture_id, recipe_id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Delete all pictures from recipe in database
 * @param recipe_id recipe id
 * @returns empty promise
 */
export function deleteAllPicturesFromRecipe(recipe_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM recipe_picture WHERE recipe_id = ?`, [recipe_id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Convert row to Recipe
 * @param row rows from database
 * @returns Promise with the recipe
 */
function convertRowToRecipe(row: any): Promise<Recipe> {
    return new Promise((resolve, reject) => {
        let recipe: Recipe = {
            id: row.id,
            name: row.name,
            description: row.description,
            preparation: row.preparation,
            createdAt: row.createdAt,
            difficulty: row.difficulty,
            time: row.time,
            category_name: row.category_name,
            user_id: row.user_id,
            tags: [],
            ingredients: [],
            picture_uri: []
        };
        resolve(recipe);
    });
}

/**
 * Convert all rows to Recipe
 * @param rows rows from database
 * @returns Promise with the recipes
 */
function convertRowsToRecipes(rows: any[]): Promise<Recipe[]> {
    return new Promise<Recipe[]>((resolve, reject) => {
        let recipes: Recipe[] = [];
        rows.forEach((row) => {
            convertRowToRecipe(row).then((recipe) => {
                recipes.push(recipe);
            });
        });
        resolve(recipes);
    })
}
