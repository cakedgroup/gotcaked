import { Ingredients } from "./ingredients.model";
import { Tag } from "./tag.model";

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: Ingredients[];
    tags: Tag[];
    preparation: string;
    createdAt: Date;
    time: Number;
    difficulty: String;
    category_id: string;
    user_id: string;
    picture_uri: string;
    rating: Number;
}
