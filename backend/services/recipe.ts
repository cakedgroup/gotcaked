import { Recipe } from '../models/recipe';
import * as recipeDAO from '../storage/recipe';
import * as tagDAO from '../storage/tag';
import { generateUUID } from '../util/uuid';

export function createRecipe(recipe: Recipe): Promise<Recipe> {
    recipe.id = generateUUID();
    recipe.createdAt = new Date();

    return new Promise<Recipe>((resolve, reject) => {
        recipeDAO.createRecipe(recipe).then(recipe => {
            //Create all ingredients
            recipe.ingredients.forEach(ingredient => {
                ingredient.recipe_id = recipe.id;
                //Create ingredient
                recipeDAO.createIngredient(ingredient).catch(err => {
                    reject(err);
                });
            });

            //Create all tags and add them to recipe
            recipe.tags.forEach(tag => {
                //Create tag if not exists
                tagDAO.createTag(tag).catch(err => {
                    //Dont catch error (tag already exists)
                });

                //Add tag to recipe
                tagDAO.addRecipeTag(recipe.id, tag.name).catch(err => {
                    reject(err);
                });
            });

            resolve(recipe);
        }).catch(error => {
            reject(error);
        });
    });
}   

export function getRecipe(recipeID: string): Promise<Recipe> {
    return new Promise<Recipe>((resolve, reject) => {
        recipeDAO.getRecipe(recipeID).then(recipe => {
            resolve(recipe);
        }).catch(error => {
            reject(error);
        });
    });
}

export function getAllRecipes(): Promise<Recipe[]> {
    return new Promise<Recipe[]>((resolve, reject) => {
        recipeDAO.getRecipes().then(recipes => {
            resolve(recipes);
        }).catch(error => {
            reject(error);
        });
    });
}

export function deleteRecipe(recipeID: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        //Delete all ingredients
        recipeDAO.getIngredients(recipeID).then(ingredients => {
            ingredients.forEach(ingredient => {
                recipeDAO.deleteIngredient(ingredient.id).catch(err => {
                    reject(err);
                });
            });
        }).catch(error => {
            reject(error);
        });

        //TODO Delete all ratings
        //TODO Delete all comments

        //Delete Recipe
        recipeDAO.deleteRecipe(recipeID).then(() => {
            resolve();
        }).catch(error => {
            reject(error);
        });
    });
}