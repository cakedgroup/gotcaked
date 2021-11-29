import {Recipe, RecipeSmall} from '../models/recipe';
import * as recipeDAO from '../storage/recipe';
import * as tagDAO from '../storage/tag';
import * as userDAO from '../storage/user';
import * as categoryDAO from '../storage/category';

import {generateUUID} from '../util/uuid';

export function createRecipe(recipe: Recipe): Promise < Recipe > {
    recipe.id = generateUUID();
    recipe.createdAt = new Date();

    //TODO Check if category exists

    return new Promise < Recipe > ((resolve, reject) => {
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

export function getRecipe(recipeID: string): Promise < Recipe > {
    return new Promise < Recipe > ((resolve, reject) => {
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

export function getAllRecipes(): Promise < RecipeSmall[] > {
    return new Promise < RecipeSmall[] > ((resolve, reject) => {
        recipeDAO.getRecipes().then(recipes => {
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

export function deleteRecipe(recipeID: string, userID: string): Promise < void > {
    return new Promise < void > ((resolve, reject) => {
        //Check if user is owner of recipe
        recipeDAO.getRecipe(recipeID).then(recipe => {
            userDAO.getUserById(userID).then(user => {
                if (user.role === "admin" || user.id === userID) {
                    //Delete all ingredients
                    recipeDAO.getIngredients(recipeID).then(ingredients => {
                        ingredients.forEach(ingredient => {
                            recipeDAO.deleteIngredient(ingredient.id).catch(err => {
                                reject(err);
                            });
                            //TODO Delete all ratings
                            //TODO Delete all comments
                            //Delete Recipe
                            recipeDAO.deleteRecipe(recipeID).then(() => {
                                resolve();
                            }).catch(err => {
                                reject(err);
                            });
                        });
                    }).catch(error => {
                        reject(error);
                    });
                } else {
                    reject("User is not owner of recipe");
                }
            }).catch(err => {
                reject(err);
            });
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

export function updateRecipe(recipeID: string, updatedRecipe: Recipe, userID: string): Promise < Recipe > {
    return new Promise < Recipe > ((resolve, reject) => {
        //Check if category exits
        categoryDAO.getCategory(updatedRecipe.category_id).then((category) => {
            if (category) {
                //Check if user is owner of recipe
                recipeDAO.getRecipe(recipeID).then(recipe => {
                    userDAO.getUserById(userID).then(user => {
                        if (user.role === "admin" || user.id === recipe.user_id) {
                            //Update recipe
                            if (updatedRecipe.name) {
                                recipe.name = updatedRecipe.name;
                            }
                            if (updatedRecipe.description) {
                                recipe.description = updatedRecipe.description;
                            }
                            if (updatedRecipe.difficulty) {
                                recipe.difficulty = updatedRecipe.difficulty;
                            }
                            if (updatedRecipe.time) {
                                recipe.time = updatedRecipe.time;
                            }
                            if (updatedRecipe.category_id) {
                                recipe.category_id = updatedRecipe.category_id;
                            }
                            if (updatedRecipe.ingredients) {
                                recipe.ingredients = updatedRecipe.ingredients;
                            }
                            if (updatedRecipe.tags) {
                                recipe.tags = updatedRecipe.tags;
                            }
                            if (updatedRecipe.user_id) {
                                recipe.user_id = updatedRecipe.user_id;
                            }
                            if (updatedRecipe.preparation) {
                                recipe.preparation = updatedRecipe.preparation;
                            }

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
                        } else {
                            reject("User is not owner of recipe");
                        }
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            }
        }).catch((err) => {
            reject(new Error('Category does not exist'));
        });
    });
}
