import express from "express";
import { recipeTransformer, tagTransformer, categoryTransformer, commentTransformer } from '../util/transformer';


export function validateRecipe(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body) {
        req.body = recipeTransformer(req.body);
        next();
    } else {
        res.status(400).json({ message: "Recipe is not valid" });
    }
}

export function validateTag(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body) {
        req.body = tagTransformer(req.body);
        next();
    } else {
        res.status(400).json({ message: "Tag is not valid" });
    }
}

export function validateCategory(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body) {
        req.body = categoryTransformer(req.body);
        next();
    } else {
        res.status(400).json({ message: "Category is not valid" });
    }
}

export function validateComment(req: express.Request, res: express.Response, next: express.NextFunction){
    if (req.body) {
        req.body = commentTransformer(req.body);
        next();
    } else {
        res.status(400).json({ message: "Comment is not valid" });

    }
}