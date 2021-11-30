import {db} from './db';
import { Tag } from '../models/tag';

export function createTag(tag:Tag) : Promise<Tag> {

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

export function getTag(name: string) : Promise<Tag> {
    return new Promise<Tag>((resolve, reject) => {
        db.get(`SELECT * FROM tag WHERE name = ?`, [name], (err, row) => {
            if (err) {
                reject(err);
            }
            //Check if tag exists
            if (row) {
                let tag : Tag = {
                    name: row.name,
                    description: row.description,
                };
                resolve(tag);
            }else{
                reject(new Error(`Tag not found`));
            }
        });
    });
}

export function getTags() : Promise<Tag[]> {
    return new Promise<Tag[]>((resolve, reject) => {
        db.all(`SELECT * FROM tag`, (err, rows) => {
            if (err) {
                reject(err);
            }
            let tags : Tag[] = [];
            for (let row of rows) {
                let tag : Tag = {
                    name: row.name,
                    description: row.description,
                };
                tags.push(tag);
            }
            resolve(tags);
        });
    });
}


export function updateTag(name: string, tag : Tag) : Promise<Tag> {
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

export function deleteTag(name: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`DELETE FROM tag WHERE name = ?`, [name], (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

export function getRecipeTags(recipeId: string) : Promise<Tag[]> {
    return new Promise<Tag[]>((resolve, reject) => {
        db.all(`SELECT * FROM tag WHERE name IN (SELECT tag_name FROM recipe_tag WHERE recipe_id = ?)`, [recipeId], (err, rows) => {
            if (err) {
                reject(err);
            }
            let tags : Tag[] = [];
            for (let row of rows) {
                let tag : Tag = {
                    name: row.name,
                    description: row.description,
                };
                tags.push(tag);
            }
            resolve(tags);
        });
    });
}

export function addRecipeTag(recipeId: string, tagName: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`INSERT INTO recipe_tag (recipe_id, tag_name) VALUES (?, ?)`, [recipeId, tagName], (err) => {
            if (err) {
                reject(err);
            } else {
                
                resolve();
            }
        });
    });
}


export function deleteRecipeTagByTagName(tagName: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`DELETE FROM recipe_tag WHERE tag_name = ?`, [tagName], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
