import { JwtPayload } from "jsonwebtoken";
import { User, UserPublic } from "../models/user";
import { JWTContent } from "../services/auth";

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
        email: user.email
    };
}

export function jwtPayloadContentTransformer(payload: JwtPayload | undefined): JWTContent {
    if (payload) {
        return {
            id: payload.id,
            email: payload.email
        };
    } else {
        return {
            id: undefined,
            email: undefined
        };
    }
}