import {db} from './db';
import { generateUUID } from "../util/uuid";

export interface Tag {
    id: string;
    name: string;
    description: string;
}

export function createTag(name: string, description: string) : Promise<Tag> {

    return new Promise((resolve, reject) => {
        const tag: Tag = {
            id: generateUUID(),
            name,
            description,
        };
        db.run(`INSERT INTO tag (id, name, description) VALUES (?, ?, ?)`, [tag.id, tag.name, tag.description], (err) => {
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
                console.error(err);
                reject(err);
            }
            //Check if tag exists
            if (row) {
                let tag : Tag = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                };
                resolve(tag);
            }else{
                reject(new Error(`Tag ${name} not found`));
            }
        });
    });
}

export function getTags() : Promise<Tag[]> {
    return new Promise<Tag[]>((resolve, reject) => {
        db.all(`SELECT * FROM tag`, (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            let tags : Tag[] = [];
            for (let row of rows) {
                let tag : Tag = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                };
                tags.push(tag);
            }
            resolve(tags);
        });
    });
}

export function updateTag(id: string, name: string, description: string) : Promise<Tag> {
    return new Promise<Tag>((resolve, reject) => {
        db.run(`UPDATE tag SET name = ?, description = ? WHERE id = ?`, [name, description, id], (err) => {
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
                console.error(err);
                reject(err);
            }
            resolve();
        });
    });
}

export function getRecipeTags(recipeId: string) : Promise<Tag[]> {
    return new Promise<Tag[]>((resolve, reject) => {
        db.all(`SELECT * FROM tag WHERE id IN (SELECT tag_id FROM recipe_tag WHERE recipe_id = ?)`, [recipeId], (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            let tags : Tag[] = [];
            for (let row of rows) {
                let tag : Tag = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                };
                tags.push(tag);
            }
            resolve(tags);
        });
    });
}

export function addRecipeTag(recipeId: string, tagId: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`INSERT INTO recipe_tag (recipe_id, tag_id) VALUES (?, ?)`, [recipeId, tagId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function deleteRecipeTag(recipeId: string, tagId: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`DELETE FROM recipe_tag WHERE recipe_id = ? AND tag_id = ?`, [recipeId, tagId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}