import { Ingredients } from "./ingredients.model";

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: Ingredients[];
    preparation: string;
    createdAt: Date;
    time: Number;
    difficulty: String;
    category_id: string;
    user_id: string;
}
