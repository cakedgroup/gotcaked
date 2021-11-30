import { Rating } from "../models/recipe";
import { Recipe, RecipeSmall } from '../models/recipe';
import * as categoryDAO from '../storage/category';
import * as recipeDAO from '../storage/recipe';
import * as tagDAO from '../storage/tag';
import * as commentDAO from '../storage/comment';
import { generateUUID } from '../util/uuid';


export function createRecipe(recipe: Recipe): Promise<Recipe> {
    recipe.id = generateUUID();
    recipe.createdAt = new Date();

    return new Promise<Recipe>((resolve, reject) => {
        //Check if category exits
        categoryDAO.getCategory(recipe.category_id).then((category) => {
            if (category) {
                recipeDAO.createRecipe(recipe).then(recipe => {
                    //Create all ingredients
                    recipe.ingredients.forEach(ingredient => {
                        ingredient.id = generateUUID();
                        ingredient.recipe_id = recipe.id;
                        //Create ingredient
                        recipeDAO.createIngredient(ingredient).catch(err => {
                            reject(err);
                        });
                    });
                    //Create all tags and add them to recipe
                    recipe.tags.forEach(tag => {
                        //Create tag if not exists
                        tagDAO.createTag(tag).then().catch(err => {
                            //Dont catch error (tag already exists)
                        }).finally(() => {
                            //Add tag to recipe
                            tagDAO.addRecipeTag(recipe.id, tag.name).catch(err => {
                                reject(err);
                            });
                        });
                    });
                    resolve(recipe);
                }).catch(error => {
                    reject(error);
                });
            }
        }).catch((err) => {
            reject(new Error('Category does not exist'));
        });
    });
}

export function getRecipe(recipeID: string): Promise<Recipe> {
    return new Promise<Recipe>((resolve, reject) => {
        recipeDAO.getRecipe(recipeID).then(recipe => {
            //Get all ingredients
            recipeDAO.getIngredients(recipe.id).then(ingredients => {
                ingredients.forEach(ingredient => {
                    recipe.ingredients.push(ingredient);
                });
                //Get all tags
                tagDAO.getRecipeTags(recipe.id).then(tags => {
                    tags.forEach(tag => {
                        recipe.tags.push(tag);
                    });
                    resolve(recipe);
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        }).catch(error => {
            reject(error);
        });
    });
}

export function getRandomRecipe(categoryId: string, tagId: string): Promise<Recipe> {
    return new Promise<Recipe>((resolve, reject) => {
        recipeDAO.getRandomRecipe(categoryId,tagId).then(recipe => {
            //Get all ingredients
            recipeDAO.getIngredients(recipe.id).then(ingredients => {
                ingredients.forEach(ingredient => {
                    recipe.ingredients.push(ingredient);
                });
                //Get all tags
                tagDAO.getRecipeTags(recipe.id).then(tags => {
                    tags.forEach(tag => {
                        recipe.tags.push(tag);
                    });
                    resolve(recipe);
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        }).catch(error => {
            reject(error);
        });
    });
}           

export function getAllRecipes(limit: number, offset: number): Promise<RecipeSmall[]> {
    return new Promise<RecipeSmall[]>((resolve, reject) => {
        recipeDAO.getRecipes(limit, offset).then(recipes => {
            let allRecipes: RecipeSmall[] = [];
            recipes.forEach(recipe => {
                let recipeSmall: RecipeSmall = {
                    id: recipe.id,
                    name: recipe.name,
                    description: recipe.description,
                    createdAt: recipe.createdAt,
                    difficulty: recipe.difficulty,
                    time: recipe.time,
                    category_id: recipe.category_id,
                    user_id: recipe.user_id
                };
                allRecipes.push(recipeSmall);
            });
            resolve(allRecipes);
        }).catch(error => {
            reject(error);
        });
    });
}

export function deleteRecipe(recipeID: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        //Check if recipe exists
        recipeDAO.getRecipe(recipeID).then(recipe => {
            if (recipe) {
                //Delete all ingredients
                recipeDAO.getIngredients(recipeID).then(ingredients => {
                    ingredients.forEach(ingredient => {
                        recipeDAO.deleteIngredient(ingredient.id).catch(err => {
                            reject(err);
                        });
                        //TODO Delete all ratings
                        //Delete all comments from recipe
                        commentDAO.deleteAllComments(recipeID).catch(err => {
                            reject(err);
                        });
                        //Delete Recipe
                        recipeDAO.deleteRecipe(recipeID).then(() => {
                            resolve();
                        }).catch(err => {
                            reject(err);
                        });
                    });
                }).catch(() => reject(new Error('Recipe does not exist')));
            } else {
                reject(new Error('Recipe does not exist'));
            }
        }).catch(() => reject(new Error("Recipe does not exist")));
    });
}

export function updateRecipe(recipeID: string, updatedRecipe: Recipe): Promise<Recipe> {
    return new Promise<Recipe>((resolve, reject) => {
        //Check if category exits
        categoryDAO.getCategory(updatedRecipe.category_id).then((category) => {
            if (category) {
                //Get current Recipe
                recipeDAO.getRecipe(recipeID).then(recipe => {
                    //Update recipe fields
                    recipe.name = updatedRecipe.name || recipe.name;
                    recipe.description = updatedRecipe.description || recipe.description;
                    recipe.difficulty = updatedRecipe.difficulty || recipe.difficulty;
                    recipe.time = updatedRecipe.time || recipe.time;
                    recipe.category_id = updatedRecipe.category_id || recipe.category_id;
                    recipe.ingredients = updatedRecipe.ingredients || recipe.ingredients;
                    recipe.tags = updatedRecipe.tags || recipe.tags;
                    recipe.preparation = updatedRecipe.preparation || recipe.preparation;

                    //Update recipe
                    recipeDAO.updateRecipe(recipe).then(recipe => {
                        //Delete all ingredients
                        recipeDAO.getIngredients(recipeID).then(ingredients => {
                            ingredients.forEach(ingredient => {
                                recipeDAO.deleteIngredient(ingredient.id).catch(err => {
                                    reject(err);
                                });
                            });
                            //Create all ingredients
                            recipe.ingredients.forEach(ingredient => {
                                ingredient.id = generateUUID();
                                ingredient.recipe_id = recipe.id;
                                //Create ingredient
                                recipeDAO.createIngredient(ingredient).catch(err => {
                                    reject(err);
                                });
                            });
                            //Create all tags and add them to recipe
                            recipe.tags.forEach(tag => {
                                //Create tag if not exists
                                tagDAO.createTag(tag).then().catch(err => {
                                    //Dont catch error (tag already exists)
                                }).finally(() => {
                                    //Add tag to recipe
                                    tagDAO.addRecipeTag(recipe.id, tag.name).catch(err => {
                                        reject(err);
                                    });
                                });
                            });
                            resolve(recipe);
                        }).catch(err => {
                            reject(err);
                        });
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(() => reject(new Error('Recipe does not exist')));
            } else {
                reject(new Error('Category does not exist'));
            }
        }).catch(() => reject(new Error('Category does not exist')));
    });
}

export function rateRecipe(rating : Rating) : Promise<void>{
    rating.vote > 0 ? rating.vote = 1 : rating.vote = -1;

    return new Promise<void>((resolve, reject) => {
        recipeDAO.getRecipe(rating.recipe_id).then(recipe => {
            if (recipe) {
                recipeDAO.getUserRecipeRating(rating.user_id, rating.recipe_id).then(() => {
                    recipeDAO.updateRating(rating).then(() => {
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    });
                }).catch(
                    (err) => {
                        if (err.message === "Rating not found") {
                            recipeDAO.createRating(rating).then(() => {
                                resolve();
                            }).catch((err) => {
                                reject(err);
                            });
                        } else {
                            reject(err);
                        }
                    }
                );
            } else {
                reject(new Error('Recipe not found'));
            }
        }).catch(() => reject(new Error('Recipe not found')));
    });
}

export function getRatingFromUser(user_id : string, recipe_id : string) : Promise<Rating>{
    return new Promise<Rating>((resolve, reject) => {
        recipeDAO.getUserRecipeRating(user_id, recipe_id).then((rating) => {
            resolve(rating);
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getRecipeRating(recipe_id : string) : Promise<number>{
    return new Promise<number>((resolve, reject) => {
        recipeDAO.getRecipe(recipe_id).then((recipe) => {
            if (recipe) {
                recipeDAO.getRecipeRating(recipe_id).then((rating) => {
                    resolve(rating);
                }).catch((err) => {
                    reject(err);
                });
            } else {
                reject(new Error('Recipe not found'));
            }
        }).catch((err) => {
            reject(err);
        });
    });
}
