import { Rating } from "../models/recipe";
import * as recipeDAO from "../storage/recipe";



export function rateRecipe(rating : Rating) : Promise<void>{
    return new Promise<void>((resolve, reject) => {
        recipeDAO.getUserRecipeRating(rating.user_id, rating.recipe_id).then((rating) => {
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
        recipeDAO.getRecipeRating(recipe_id).then((rating) => {
            resolve(rating);
        }).catch((err) => {
            reject(err);
        });
    });
}