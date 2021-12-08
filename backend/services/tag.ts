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
