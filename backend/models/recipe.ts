import {db} from './db';
import { generateUUID } from "../util/uuid";
import { Tag } from './tag';

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    preparation: string;
    category_id: string;
    user_id: string;
}

export function createRecipe(recipe: Recipe): Promise<Recipe> {
    const newId = generateUUID();
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO recipes (id, name, description, ingredients, preparation, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [newId, recipe.name, recipe.description, recipe.ingredients, recipe.preparation, recipe.category_id, recipe.user_id],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(recipe);
                }
            });
    });
}