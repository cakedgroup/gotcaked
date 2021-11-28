import { Tag } from "./tag";

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    tags: Tag[];
    preparation: string;
    createdAt: Date;
    difficulty: string;
    time: Number;
    category_id: string;
    user_id: string;
}

export interface Ingredient {
    id: string;
    name: string;
    amount: string;
    unit: string;
    recipe_id: string;
}