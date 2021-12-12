import { db } from './db';
import { Tag } from '../models/tag';

/**
 * Create a new tag in database
 * @param tag tag to create
 * @returns Promise with the created tag
 */
export function createTag(tag: Tag): Promise<Tag> {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO tag (name, description) VALUES (?, ?)`, [tag.name, tag.description], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(tag);
            }
        });
    });
}

/**
 * Get tag by name from database
 * @param name name of the tag
 * @returns Promise with the tag
 */
export function getTag(name: string): Promise<Tag> {
    return new Promise<Tag>((resolve, reject) => {
        db.get(`SELECT * FROM tag WHERE name = ?`, [name], (err, row) => {
            if (err) {
                reject(err);
            }
            //Check if tag exists
            if (row) {
                let tag: Tag = {
                    name: row.name,
                    description: row.description,
                };
                resolve(tag);
            } else {
                reject(new Error(`Tag not found`));
            }
        });
    });
}

/**
 * Get all tags from database
 * @returns Promise with the tags
 */
export function getTags(): Promise<Tag[]> {
    return new Promise<Tag[]>((resolve, reject) => {
        db.all(`SELECT * FROM tag`, (err, rows) => {
            if (err) {
                reject(err);
            }
            let tags: Tag[] = [];
            for (let row of rows) {
                let tag: Tag = {
                    name: row.name,
                    description: row.description,
                };
                tags.push(tag);
            }
            resolve(tags);
        });
    });
}

/**
 * Update a tag in database
 * @param name name of the to update tag
 * @param tag new tag data
 * @returns Promise with the updated tag
 */
export function updateTag(name: string, tag: Tag): Promise<Tag> {
    return new Promise<Tag>((resolve, reject) => {
        db.run(`UPDATE tag SET description = ? WHERE name = ? `, [tag.description, name], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(getTag(name));
            }
        });
    });
}

/**
 * Delete a tag from database
 * @param name name of the tag to delete
 * @returns empty Promise
 */
export function deleteTag(name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`DELETE FROM tag WHERE name = ?`, [name], (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

/**
 * Get Tag by name and recipe from database
 * @param tag_name 
 * @param recipe_id 
 * @returns Promise with tag
 */
export function getRecipeTag(tag_name: string, recipe_id: string): Promise<Tag> {
    return new Promise<Tag>((resolve, reject) => {
        db.get(`SELECT * FROM tag WHERE name IN (SELECT tag_name FROM recipe_tag WHERE tag_name = ? and recipe_id = ?)`, [tag_name, recipe_id], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

/**
 * Get all tags from a recipe from database
 * @param recipe_id recipe id
 * @returns Promise with the tags
 */
export function getRecipeTags(recipe_id: string): Promise<Tag[]> {
    return new Promise<Tag[]>((resolve, reject) => {
        db.all(`SELECT * FROM tag WHERE name IN (SELECT tag_name FROM recipe_tag WHERE recipe_id = ?)`, [recipe_id], (err, rows) => {
            if (err) {
                reject(err);
            }
            let tags: Tag[] = [];
            for (let row of rows) {
                let tag: Tag = {
                    name: row.name,
                    description: row.description,
                };
                tags.push(tag);
            }
            resolve(tags);
        });
    });
}

/**
 * Create Recipe Tag in database
 * @param recipe_id recipe id
 * @param tag_name tag name
 * @returns empty Promise
 */
export function addRecipeTag(recipe_id: string, tag_name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`INSERT INTO recipe_tag (recipe_id, tag_name) VALUES (?, ?)`, [recipe_id, tag_name], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Delete Recipe Tag by name from database
 * @param tag_name tag name
 * @returns empty Promise
 */
export function deleteRecipeTagByTagName(tag_name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`DELETE FROM recipe_tag WHERE tag_name = ?`, [tag_name], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Delete Recipe Tag by recipe id from database
 * @param recipe_id recipe id
 * @returns empty Promise
 */
export function deleteRecipeTagByRecipeId(recipe_id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`DELETE FROM recipe_tag WHERE recipe_id = ?`, [recipe_id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}