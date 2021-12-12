import { JwtPayload } from "jsonwebtoken";
import { JWTContent } from "../models/auth";
import { User, UserPublic } from "../models/user";

export function userTransformer(user: User): UserPublic {
    return {
        id: user.id,
        name: user.name,
        description: user.description,
        picture_uri: user.picture_uri,
        email: user.email
    };
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