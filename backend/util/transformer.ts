import { User, UserPublic } from "../models/user";
import { jwtContent } from "../services/auth";

export function userTransformer (user: User): UserPublic {
    return {
        id: user.id,
        name: user.name,
        description: user.description,
        picture_uri: user.picture_uri,
        email: user.email
    };
}

export function jwtContentTransformer (user: User): jwtContent {
    return {
        id: user.id,
        email: user.email
    };
}