import express from "express";
import { recipeTransformer, tagTransformer, categoryTransformer, commentTransformer, ratingTransformer } from '../util/transformer';


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

export function validateComment(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body) {
        req.body = commentTransformer(req.body);
        next();
    } else {
        res.status(400).json({ message: "Comment is not valid" });

    }
}

export function validateRating(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body) {
        req.body = ratingTransformer(req.body);
        next();
    } else {
        res.status(400).json({ message: "Rating is not valid" });
    }
}


export function validatePicture(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.files) {
        if (req.files.picture && req.files.picture.mimetype.includes("image")) {
            next();
        } else {
            res.status(400).json({ message: "Picture is not valid" });
        }
    } else {
        res.status(400).json({ message: "No file uploaded" });
    }
}