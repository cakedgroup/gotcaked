import * as tagDAO from '../storage/tag';
import { Tag } from '../models/tag';

/**
 * Get all tags
 * @returns Promise with tags
 */
export function getAllTags(): Promise<Tag[]> {
    return tagDAO.getTags();
}

/**
 * Get tag by name
 * @param name name of tag
 * @returns Promise with tag
 */
export function getTagByName(name: string): Promise<Tag> {
    return tagDAO.getTag(name);
}

/**
 * Create tag
 * @param tag tag to create
 * @returns Promise with created tag
 */
export function createTag(tag: Tag): Promise<Tag> {
    return new Promise((resolve, reject) => {
        tagDAO.getTag(tag.name).then(existingTag => {
            if (existingTag) {
                reject(new Error('Tag already exists'));
            } else {
                tagDAO.createTag(tag).then(resolve, reject);
            }
        }).catch(() => {
            tagDAO.createTag(tag).then(resolve, reject);
        });
    });
}


/**
 * Delete tag with name
 * @param name name of tag
 * @returns empty Promise
 */
export function deleteTag(name: string): Promise<void> {
    //Delete all references to this tag
    return new Promise<void>((resolve, reject) => {
        tagDAO.getTag(name).then((tag) => {
            tagDAO.deleteRecipeTagByTagName(name).then(() => {
                tagDAO.deleteTag(name).then(() => {
                    resolve();
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
