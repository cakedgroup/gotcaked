import express from "express";
import * as jwt from 'jsonwebtoken';
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
        jwt.verify(jwtToken, getSecret(), {algorithms: ['HS256']}, (err, payload) => {
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
    if (req.jwtContent?.id === req.params.id || req.jwtContent?.role === "user" || req.jwtContent?.role === "admin") {
        next();
    } else {
        authHandler(req, res, next);
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