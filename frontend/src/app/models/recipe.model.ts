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
  difficulty: string;
  category_name: string;
  user_id: string;
  picture_uri: string[];
  rating: Number;
}

export interface RecipeCreate {
  name: string;
  description: string;
  ingredients: Ingredients[];
  tags: Tag[];
  preparation: string;
  time: Number;
  difficulty: string;
  category_name: string;
  picture_uri: string[];
}

export interface Rating {
  rating: Number | null;
}
