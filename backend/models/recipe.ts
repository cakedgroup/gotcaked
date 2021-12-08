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
    picture_uri: string[];
}

export interface RecipeSmall {
    id: string;
    name: string;
    description: string;
    tags: Tag[];
    picture_uri: string;
    createdAt: Date;
    difficulty: string;
    time: Number;
    category_id: string;
    user_id: string;
    rating: Number;
}

export interface Ingredient {
    id: string;
    name: string;
    amount: string;
    unit: string;
    recipe_id: string;
}

export interface RecipePicture {
    picture_id: string;
    recipe_id: string;
}

export interface Rating {
    user_id: string;
    recipe_id: string;
    vote: number;
}

export interface RatingCount {
    rating: number;
}