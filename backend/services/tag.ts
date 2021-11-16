import * as tagDAO from '../storage/tag';
import { Tag } from '../models/tag';

export function getAllTags(): Promise<Tag[]> {
    return tagDAO.getTags();
}

export function getTagByName(name: string): Promise<Tag> {
    return tagDAO.getTag(name);
}

export function createTag(tag: Tag): Promise<Tag> {
    return tagDAO.createTag(tag);
}

export function updateTag(name: string,tag: Tag): Promise<Tag> {
    return tagDAO.updateTag(name,tag);
}

export function deleteTag(name: string): Promise<void> {
    //Delete all references to this tag
    return new Promise<void>((resolve, reject) => {
        tagDAO.deleteRecipeTagByTagName(name).then(() => {
            //Delete the tag
            tagDAO.deleteTag(name).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}