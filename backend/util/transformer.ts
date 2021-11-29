import e from "cors";
import { JwtPayload } from "jsonwebtoken";
import { JWTContent } from "../models/auth";
import { User, UserPublic } from "../models/user";
import { Recipe } from '../models/recipe';
import { Tag } from '../models/tag';
import { Category } from '../models/category';

export function userTransformer(user: User): UserPublic {
    return {
        id: user.id,
        name: user.name,
        description: user.description,
        picture_uri: user.picture_uri,
        email: user.email
    };
}

export function recipeTransformer(recipe: Recipe): Recipe {
    return {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        tags: recipe.tags,
        preparation: recipe.preparation,
        createdAt: recipe.createdAt,
        difficulty: recipe.difficulty,
        category_id: recipe.category_id,
        user_id: recipe.user_id,
        time: recipe.time
    }
}

export function tagTransformer(tag: Tag): Tag {
    return{
        name: tag.name,
        description: tag.description
    }
}

export function categoryTransformer(category: Category): Category {
    return{
        name: category.name,
        description: category.description
    }
}

export function jwtContentTransformer(user: User): JWTContent {
    return {
        id: user.id,
        email: user.email,
        role: user.role
    };
}

export function jwtPayloadContentTransformer(payload: JwtPayload): JWTContent {
    return {
        id: payload.id,
        email: payload.email,
        role: payload.role
    };
}