import { Category } from '../models/category';
import { Recipe, RecipeSmall } from '../models/recipe';
import * as tagDAO from '../storage/tag';
import * as categoryDAO from '../storage/category';
import * as recipeDAO from '../storage/recipe';

export function getAllCategories(): Promise<Category[]> {
    return categoryDAO.getCategorys();
}

export function getCategoryById(name: string): Promise<Category> {
    return categoryDAO.getCategory(name);
}

export function getRecipesByCategory(name: string, limit: number, offset: number): Promise<RecipeSmall[]> {
    return new Promise<RecipeSmall[]>((resolve, reject) => {
        recipeDAO.getRecipesByCategory(name, limit, offset).then((recipes) => {
            let convertRecipes = new Promise<RecipeSmall[]>((resolve, reject) => {
                let allRecipes: RecipeSmall[] = [];
                    recipes.forEach(async (recipe, index, array) => {
                        await recipeDAO.getPicturesFromRecipe(recipe.id).then(async pictures => {
                            //If no picture return undefined
                            let firstPicture : string = pictures[0]?.picture_id;
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
                                        category_id: recipe.category_id,
                                        user_id: recipe.user_id,
                                        rating: rating.rating || 0
                                    };
                                    allRecipes.push(recipeSmall);
                                    if (index === array.length -1) resolve(allRecipes);
                                }).catch(err => {
                                    reject(err);
                                });
    
                            }).catch(err => {
                                reject(err);
                            });
                        }).catch(err => {
                            reject(err);
                        });
                    });
                });
                //Wait for converter promise to finish
                convertRecipes.then((allRecipes) => {
                    resolve(allRecipes);
                }).catch(err => {
                    reject(err);
                });
        }).catch((err) => {
            reject(err);
        })
    });
}

export function createCategory(category: Category): Promise<Category> {
    return categoryDAO.createCategory(category);
}

export function deleteCategory(name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        categoryDAO.getCategory(name).then(() => {
            categoryDAO.deleteCategory(name).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}

export function updateCategory(name: string, newCategory: Category): Promise<Category> {
    return categoryDAO.updateCategory(name, newCategory);
}