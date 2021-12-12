import fileUpload from 'express-fileupload';
import { Ingredient, Rating, RatingCount, Recipe, RecipeSmall } from '../models/recipe';
import { Tag } from '../models/tag';
import * as categoryDAO from '../storage/category';
import * as commentDAO from '../storage/comment';
import * as recipeDAO from '../storage/recipe';
import * as tagDAO from '../storage/tag';
import * as fileHandler from '../util/fileHandler';
import { generateUUID } from '../util/uuid';

/**
 * Create new recipe
 * @param recipe recipe to create
 * @returns Promise with created recipe
 */
export function createRecipe(recipe: Recipe): Promise<Recipe> {
    recipe.id = generateUUID();
    recipe.createdAt = new Date();

    return new Promise<Recipe>((resolve, reject) => {
        //Check if category exits
        categoryDAO.getCategory(recipe.category_name).then((category) => {
            if (category) {
                recipeDAO.createRecipe(recipe).then(recipe => {
                    Promise.all([createAllIngredients(recipe.id, recipe.ingredients), addTagsToRecipe(recipe.id, recipe.tags)]).then(() => {
                        resolve(recipe);
                    }).catch(err => {
                        reject(err);
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

/**
 * Get recipe by id
 * @param recipe_id id of recipe
 * @returns Promise with recipe
 */
export function getRecipe(recipe_id: string): Promise<Recipe> {
    return new Promise<Recipe>((resolve, reject) => {
        recipeDAO.getRecipe(recipe_id).then(recipe => {
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
                    //Get Pictures
                    recipeDAO.getPicturesFromRecipe(recipe.id).then(pictures => {
                        pictures.forEach(picture => {
                            recipe.picture_uri.push(picture.picture_id);
                        });
                        resolve(recipe);
                    }).catch(err => {
                        reject(err);
                    });
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

/**
 * Get random recipes
 * @param category_id category to filter recipes
 * @param tagId tag to filter recipes
 * @returns Promise with random recipe
 */
export function getRandomRecipe(category_id?: string, tagId?: string): Promise<RecipeSmall> {
    return new Promise<RecipeSmall>((resolve, reject) => {
        recipeDAO.getRandomRecipe(category_id, tagId).then(recipe => {
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
                    //Get Pictures
                    recipeDAO.getPicturesFromRecipe(recipe.id).then(pictures => {
                        pictures.forEach(picture => {
                            recipe.picture_uri.push(picture.picture_id);
                        });
                        let test: Recipe[] = [recipe]
                        convertRecipeToRecipeSmall(test).then(recipeSmall => {
                            resolve(recipeSmall[0]);
                        });
                    }).catch(err => {
                        reject(err);
                    });
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


/**
 * Get all recipes
 * @param limit limit of recipes to return
 * @param offset offset of recipes to return
 * @returns Promise with all recipes
 */
export function getAllRecipes(limit: number, offset: number): Promise<RecipeSmall[]> {
    return new Promise<RecipeSmall[]>((resolve, reject) => {
        recipeDAO.getRecipes(limit, offset).then(recipes => {
            //Wait for converter promise to finish
            convertRecipeToRecipeSmall(recipes).then((allRecipes) => {
                resolve(allRecipes);
            }).catch(err => {
                reject(err);
            });
        }).catch(error => {
            reject(error);
        });
    });
}

/**
 * Get all recipes from user
 * @param userID user id of recipe author
 * @returns Promise with all recipes from user
 */
export function getRecipesFromUser(userID: string): Promise<RecipeSmall[]> {
    return new Promise<RecipeSmall[]>((resolve, reject) => {
        recipeDAO.getRecipesFromUser(userID).then(recipes => {
            //Wait for converter promise to finish
            convertRecipeToRecipeSmall(recipes).then((allRecipes) => {
                resolve(allRecipes);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * Get all liked recipes of user
 * @param userID user id of user
 * @returns Promise with all liked recipes
 */
export function getLikedRecipesFromUser(userID: string): Promise<RecipeSmall[]> {
    return new Promise<RecipeSmall[]>((resolve, reject) => {
        recipeDAO.getLikedRecipesFromUser(userID).then(recipes => {
            //Wait for converter promise to finish
            convertRecipeToRecipeSmall(recipes).then((allRecipes) => {
                resolve(allRecipes);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * Delete recipe by id
 * @param recipe_id recipe id to delete
 * @returns empty promise
 */
export function deleteRecipe(recipe_id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        //Check if recipe exists
        recipeDAO.getRecipe(recipe_id).then(recipe => {
            if (recipe) {
                Promise.all([
                    commentDAO.deleteAllComments(recipe_id),
                    recipeDAO.deleteAllIngredients(recipe_id),
                    deleteAllPicturesFromRecipe(recipe_id),
                    recipeDAO.deleteAllRatingsFromRecipe(recipe_id),
                    tagDAO.deleteRecipeTagByRecipeId(recipe_id)]).then(() => {
                        //Delete Recipe
                        recipeDAO.deleteRecipe(recipe_id).then(() => {
                            resolve();
                        }).catch(err => {
                            reject(err);
                        });

                    }).catch(err => {
                        reject(err);
                    });
            } else {
                reject(new Error('Recipe does not exist'));
            }
        }).catch(err => {
            reject(new Error('Recipe does not exist'));
        });
    });
}

/**
 * Delete all pictures from recipe
 * @param recipe_id 
 * @returns empty promise
 */
function deleteAllPicturesFromRecipe(recipe_id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        //Get all pictures and delete them on the file system and db
        recipeDAO.getPicturesFromRecipe(recipe_id).then(pictures => {
            Promise.all(pictures.map(picture => {
                fileHandler.deleteFile(picture.picture_id, "recipe").then(() => resolve()).catch(err => {
                    reject(new Error('Could not delete picture'));
                });
            })).then(() => {
                recipeDAO.deleteAllPicturesFromRecipe(recipe_id).then(() => resolve()).catch(err => reject(err));
            }).catch(err => reject(err));
        });
    });
}

/**
 * Update recipe by id
 * @param recipe_id id of recipe to update
 * @param updatedRecipe updated recipe
 * @returns Promise with updated recipe
 */
export function updateRecipe(recipe_id: string, updatedRecipe: Recipe): Promise<Recipe> {
    return new Promise<Recipe>((resolve, reject) => {
        //Check if category exits
        categoryDAO.getCategory(updatedRecipe.category_name).then((category) => {
            if (category) {
                //Get current Recipe
                recipeDAO.getRecipe(recipe_id).then(recipe => {
                    if (recipe) {
                        //Update recipe fields
                        recipe.name = updatedRecipe.name || recipe.name;
                        recipe.description = updatedRecipe.description || recipe.description;
                        recipe.difficulty = updatedRecipe.difficulty || recipe.difficulty;
                        recipe.time = updatedRecipe.time || recipe.time;
                        recipe.category_name = updatedRecipe.category_name || recipe.category_name;
                        recipe.ingredients = updatedRecipe.ingredients || recipe.ingredients;
                        recipe.tags = updatedRecipe.tags || recipe.tags;
                        recipe.preparation = updatedRecipe.preparation || recipe.preparation;

                        //Update recipe
                        recipeDAO.updateRecipe(recipe).then(recipe => {
                            //Delete all ingredients
                            recipeDAO.deleteAllIngredients(recipe_id).then(() => {
                                //Create new ingredients and create Tags and add them
                                Promise.all([createAllIngredients(recipe_id, recipe.ingredients), addTagsToRecipe(recipe_id, recipe.tags)]).then(() => {
                                    resolve(recipe);
                                }).catch(err => {
                                    reject(err);
                                });
                            });
                        }).catch(err => {
                            reject(err);
                        });
                    } else {
                        reject(new Error('Recipe does not exist'));
                    }
                }).catch(error => {
                    reject(new Error('Recipe does not exist'));
                });
            } else {
                reject(new Error('Category does not exist'));
            }
        }).catch(() => reject(new Error('Category does not exist')));
    });
}

/**
 * Add picture to recipe
 * @param recipe_id recipe id to add picture to
 * @param picture picture to add
 * @returns empty promise
 */
export function addPicture(recipe_id: string, picture: fileUpload.UploadedFile): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
        //Check if recipe exists
        recipeDAO.getRecipe(recipe_id).then(recipe => {
            if (recipe) {
                //Save Picture
                fileHandler.saveFile(picture, "recipe").then((picture_uri) => {
                    recipeDAO.createPicture(recipe_id, picture_uri).then(() => {
                        resolve(getRecipe(recipe_id));
                    }).catch(err => {
                        //Delete file, bc the reference was not saved to the db
                        fileHandler.deleteFile(picture_uri, "recipe")
                        reject(new Error("Could not save picture"));
                    });
                }).catch(err => {
                    reject(new Error("Could not save picture"));
                });
            } else {
                reject(new Error("Recipe does not exist"));
            }
        });
    }
    );
}

/**
 * Delete picture from recipe
 * @param recipe_id recipe id to delete picture from
 * @param pictureID picture id to delete
 * @returns empty promise
 */
export function deletePicture(recipe_id: string, pictureID: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
        //Check if recipe exists
        recipeDAO.getRecipe(recipe_id).then(recipe => {
            if (recipe) {
                //Get Picture
                recipeDAO.getPicturesFromRecipe(recipe_id).then(pictures => {
                    //Check if Picture exists in recipe
                    let pictureExists: boolean = pictures.filter(picture => picture.picture_id === pictureID).length > 0;
                    if (pictureExists) {
                        //Delete Picture
                        recipeDAO.deletePictureFromRecipe(recipe_id, pictureID).then(() => {
                            //Delete file
                            fileHandler.deleteFile(pictureID, "recipe").then(() => {
                                resolve(getRecipe(recipe_id));
                            }).catch(err => {
                                reject(new Error("Could not delete picture"));
                            });
                        }).catch(err => {
                            reject(new Error("Could not delete picture"));
                        });
                    } else {
                        reject(new Error("Picture does not exist"));
                    }
                }).catch(err => {
                    reject(new Error("Picture does not exist"));
                });
            } else {
                reject(new Error("Recipe does not exist"));
            }
        }).catch(err => {
            reject(new Error("Recipe does not exist"));
        });
    });
}

/**
 * Create rating for recipe
 * @param rating Rating with recipe id and user id
 * @returns empty promise
 */
export function rateRecipe(rating: Rating): Promise<void> {
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

/**
 * Get rating of user for recipe
 * @param user_id 
 * @param recipe_id 
 * @returns Promise with rating
 */
export function getRatingFromUser(user_id: string, recipe_id: string): Promise<Rating> {
    return new Promise<Rating>((resolve, reject) => {
        recipeDAO.getUserRecipeRating(user_id, recipe_id).then((rating) => {
            resolve(rating);
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * Get total rating of recipe
 * @param recipe_id 
 * @returns Promise with total rating
 */
export function getRecipeRating(recipe_id: string): Promise<RatingCount> {
    return new Promise<RatingCount>((resolve, reject) => {
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

/**
 * Get all recipes with category
 * @param name category name
 * @param limit limit of recipes
 * @param offset offset of recipes
 * @returns Promise with recipes
 */
export function getRecipesByCategory(name: string, limit: number, offset: number): Promise<RecipeSmall[]> {
    return new Promise<RecipeSmall[]>((resolve, reject) => {
        categoryDAO.getCategory(name).then(category => {
            if (category) {
                recipeDAO.getRecipesByCategory(name, limit, offset).then((recipes) => {
                    //Wait for converter promise to finish
                    convertRecipeToRecipeSmall(recipes).then((allRecipes) => {
                        resolve(allRecipes);
                    }).catch(err => {
                        reject(err);
                    });
                }).catch((err) => {
                    reject(err);
                })
            } else {
                reject(new Error('Category not found'));
            }
        }).catch(() => reject(new Error('Category not found')));
    });
}

/**
 * Get all recipes with tag
 * @param name tag name
 * @param limit limit of recipes
 * @param offset offset of recipes
 * @returns Promise with recipes
 */
export function getRecipesByTag(name: string, limit: number, offset: number): Promise<RecipeSmall[]> {
    return new Promise<RecipeSmall[]>((resolve, reject) => {
        tagDAO.getTag(name).then((tag) => {
            if (tag) {
                recipeDAO.getRecipesByTag(name, limit, offset).then((recipes) => {
                    //Wait for converter promise to finish
                    convertRecipeToRecipeSmall(recipes).then((allRecipes) => {
                        resolve(allRecipes);
                    }).catch(err => {
                        reject(err);
                    });
                }).catch((err) => {
                    reject(err);
                })
            } else {
                reject(new Error('Tag not found'));
            }
        }).catch(() => reject(new Error('Tag not found')));
    });
}

/**
 * Convert recipe to recipe small
 * @param recipes Recipes to convert
 * @returns Promise with converted recipes
 */
function convertRecipeToRecipeSmall(recipes: Recipe[]): Promise<RecipeSmall[]> {
    return new Promise<RecipeSmall[]>(async (resolve, reject) => {
        let allRecipes: RecipeSmall[] = [];

        for await (const recipe of recipes) {
            await recipeDAO.getPicturesFromRecipe(recipe.id).then(async pictures => {
                //If no picture return undefined
                let firstPicture: string = pictures[0]?.picture_id;
                await tagDAO.getRecipeTags(recipe.id).then(async tags => {
                    recipe.tags = tags;
                    //Get rating
                    await recipeDAO.getRecipeRating(recipe.id).then(rating => {
                        let recipeSmall: RecipeSmall = {
                            id: recipe.id,
                            name: recipe.name,
                            description: recipe.description,
                            tags: recipe.tags,
                            picture_uri: firstPicture,
                            createdAt: recipe.createdAt,
                            difficulty: recipe.difficulty,
                            time: recipe.time,
                            category_name: recipe.category_name,
                            user_id: recipe.user_id,
                            rating: rating.rating || 0
                        };
                        allRecipes.push(recipeSmall);
                    }).catch(err => {
                        reject(err);
                    });
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        }
        resolve(allRecipes);
    });
}

/**
 * Add/Create all tags and add them to recipe
 * @param recipe_id recipe id
 * @param tags tags to add
 * @returns empty promise
 */
function addTagsToRecipe(recipe_id: string, tags: Tag[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        //Create all tags and add them to recipe
        tags.forEach(tag => {
            //Create tag if not exists
            tagDAO.createTag(tag).then().catch(err => {
                //Dont catch error (tag already exists)
            }).finally(() => {
                //Add tag to recipe
                tagDAO.getRecipeTag(tag.name, recipe_id).then(recipeTag => {
                    if (!recipeTag) {
                        tagDAO.addRecipeTag(recipe_id, tag.name).catch(err => {
                            reject(err);
                        });
                    }
                });
            });
        });
        resolve();
    });
}

/**
 * Create all ingredients and add them to recipe
 * @param recipe_id recipe id
 * @param ingredients ingredients to add
 * @returns empty promise
 */
function createAllIngredients(recipe_id: string, ingredients: Ingredient[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        //Create all ingredients
        ingredients.forEach(ingredient => {
            ingredient.id = generateUUID();
            ingredient.recipe_id = recipe_id;
            //Create ingredient
            recipeDAO.createIngredient(ingredient).catch(err => {
                reject(err);
            });
        });
        resolve();
    });
}
