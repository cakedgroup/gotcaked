import * as tagDAO from '../storage/tag';
import * as recipeDAO from '../storage/recipe';
import { Tag } from '../models/tag';
import { RecipeSmall } from '../models/recipe';

export function getAllTags(): Promise<Tag[]> {
    return tagDAO.getTags();
}

export function getTagByName(name: string): Promise<Tag> {
    return tagDAO.getTag(name);
}

export function getRecipesByTag(name: string, limit: number, offset: number): Promise<RecipeSmall[]> {
    return new Promise<RecipeSmall[]>((resolve, reject) => {
        recipeDAO.getRecipesByTag(name, limit, offset).then((recipes) => {
            let allRecipes: RecipeSmall[] = [];
            recipes.forEach(recipe => {
                //Todo First Picture
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
            })
            resolve(allRecipes);
        }).catch((err) => {
            reject(err);
        })
    });
}

export function createTag(tag: Tag): Promise<Tag> {
    return tagDAO.createTag(tag);
}

export function deleteTag(name: string): Promise<boolean> {
    //Delete all references to this tag
    return new Promise<boolean>((resolve, reject) => {
        tagDAO.getTag(name).then((tag) => {
            tagDAO.deleteRecipeTagByTagName(name).then(() => {
                tagDAO.deleteTag(name).then(() => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}
