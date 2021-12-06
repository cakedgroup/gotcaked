import express from "express";
import * as jwt from 'jsonwebtoken';
import * as recipeService from "../services/recipe";
import * as commentService from "../services/comment";
import { isJWTBlacklisted } from "../storage/blacklist";
import { getSecret } from "../util/secret";
import { jwtPayloadContentTransformer } from "../util/transformer";
import { StatusResponse } from '../models/response';

const msgUnauthenticated: StatusResponse = {
    status: "Unauthorized",
    message: "You are not authorized to access this resource"
};

export function checkJWT(req: express.Request, _res: express.Response, next: express.NextFunction) {
    let jwtToken: string = req.headers['jwt'] as string;
    if (!jwtToken) {
        next();
    } else {
        jwt.verify(jwtToken, getSecret(), { algorithms: ['HS256'] }, (err, payload) => {
            if (err) {
                next();
            } else {
                isJWTBlacklisted(jwtToken).then(isBlacklisted => {
                    if (!isBlacklisted && payload) req.jwtContent = jwtPayloadContentTransformer(payload);
                    next();
                });
            }
        });
    }
}

export function isAuthorizedUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.id === req.params.id || req.jwtContent?.role === "admin" || 
    ( req.body.userId && (req.jwtContent?.id === req.body?.userId))) {
        next();
    } else {
        authHandler(req, res, next);
    }
}

export function isAuthorized(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.id || req.jwtContent?.role === "admin") {
        next();
    } else {
        authHandler(req, res, next);
    }
}

export function isAuthorizedForRecipes(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.role === "admin") {
        next();
    } else {
        recipeService.getRecipe(req.params.id).then(recipe => {
            if (recipe.user_id === req.jwtContent?.id) {
                next();
            } else {
                authHandler(req, res, next);
            }
        }).catch(err => {
            authHandler(req, res, next);
        });
    }
}

export function isAuthorizedForComments(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.role === "admin") {
        next();
    } else {
        commentService.getComment(req.params.id).then(comment => {
            if (comment.user_id === req.jwtContent?.id) {
                next();
            } else {
                authHandler(req, res, next);
            }
        }).catch(err => {
            authHandler(req, res, next);
        });
    }
}

export function isAuthorizedAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.role === "admin") {
        next();
    } else {
        authHandler(req, res, next);
    }
}


function authHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.id === undefined) {
        res.status(401).json(msgUnauthenticated);
    } else {
        res.status(403).json(msgUnauthenticated);
    }
}