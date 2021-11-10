import express from "express";
import * as jwt from 'jsonwebtoken';
import { getSecret } from "./secret";
import { jwtPayloadContentTransformer } from "./transformer";

export function checkJWT(req: express.Request, _res: express.Response, next: express.NextFunction) {
    let jwtToken: string = req.headers['jwt'] as string;
    if (jwtToken) {
        jwt.verify(jwtToken, getSecret(), { algorithms: ['HS256'] }, (err, payload) => {
            if (err) {
                next();
            } else {
                //TODO Check if payload is on blacklist
                req.jwtContent = jwtPayloadContentTransformer(payload);
            }
        });
    }
    next();
}