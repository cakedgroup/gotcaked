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

/**
 * Check JWT token and if it is valid, set req.jwtContent to the decoded JWT payload
 * @param req express request
 * @param _res express response
 * @param next express next function
 */
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

/**
 * Check if the user is authorized to access the user resource
 * @param req express request
 * @param res express response
 * @param next express next function
 */
export function isAuthorizedUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.id === req.params.id || req.jwtContent?.role === "admin" ||
        (req.body.userId && (req.jwtContent?.id === req.body?.userId))) {
        next();
    } else {
        authHandler(req, res, next);
    }
}

/**
 * Check if the user is authorized
 * @param req express request
 * @param res express response
 * @param next express next function
 */
export function isAuthorized(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.id || req.jwtContent?.role === "admin") {
        next();
    } else {
        authHandler(req, res, next);
    }
}

/**
 * Check if the user is authorized to access the recipe resource
 * @param req express request
 * @param res express response
 * @param next express next function
 */
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

/**
 * Check if the user is authorized to access the comment resource
 * @param req express request
 * @param res express response
 * @param next express next function
 */
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

/**
 * Check if the user is authorized as admin
 * @param req express request
 * @param res express response
 * @param next express next function
 */
export function isAuthorizedAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.role === "admin") {
        next();
    } else {
        authHandler(req, res, next);
    }
}

/**
 * Error handler for unauthorized requests
 * @param req express request
 * @param res express response
 * @param next express next function
 */
function authHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.jwtContent?.id === undefined) {
        res.status(401).json(msgUnauthenticated);
    } else {
        res.status(403).json(msgUnauthenticated);
    }
}