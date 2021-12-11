import express from "express";
import { body, validationResult } from 'express-validator';
import { recipeTransformer, tagTransformer, categoryTransformer, commentTransformer, ratingTransformer, userTransformer } from '../util/transformer';

//Recipe validation
export const recipeValidationChain = [
    body("name").isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long"),
    body("ingredients").isArray().withMessage("Ingredients must be an array"),
    body("tags").isArray().withMessage("Tags must be an array"),
    body("preparation").isString().withMessage("Preparation must be a string").isLength({ min: 1 }).withMessage("Preparation is required"),
    body("difficulty").isString().withMessage("Difficulty must be a string").isLength({ min: 1 }).withMessage("Difficulty is required"),
    body("time").isNumeric().withMessage("Time must be numeric"),
    body("category_id").isString().withMessage("Category_Id must be a string").isLength({ min: 1 }).withMessage("Category is required")
];
export const recipeUpdateValidationChain = [
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long"),
    body("ingredients").optional().isArray().withMessage("Ingredients must be an array"),
    body("tags").optional().isArray().withMessage("Tags must be an array"),
    body("preparation").optional().isString().withMessage("Preparation must be a string").isLength({ min: 1 }).withMessage("Preparation must be at least 1 character long"),
    body("difficulty").optional().isString().withMessage("Difficulty must be a string").isLength({ min: 1 }).withMessage("Difficulty must be at least 1 character long"),
    body("time").optional().isNumeric().withMessage("Time must be numeric"),
    body("category_id").optional().isString().withMessage("Category_Id must be a string").isLength({ min: 1 }).withMessage("Category must be at least 1 character long")
];
export function validateRecipe(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    req.body = recipeTransformer(req.body);
    next();
}

//Tag validation
export const tagValidationChain = [
    body("name").isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];
export function validateTag(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    req.body = tagTransformer(req.body);
    next();
}

//Category validation
export const categoryValidationChain = [
    body("name").isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];
export const categoryUpdateValidationChain = [
    body("description").isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];
export function validateCategory(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    req.body = categoryTransformer(req.body);
    next();
}

//Comment validation
export const commentValidationChain = [
    body("text").isString().withMessage("Text must be a string").isLength({ min: 1 }).withMessage("Text is required"),
];
export function validateComment(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    req.body = commentTransformer(req.body);
    next();
}

//Rating validation
export const ratingValidationChain = [
    body("rating").isNumeric().withMessage("Rating must be a number").withMessage("Rating must be numeric")
];
export function validateRating(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    req.body = ratingTransformer(req.body);
    next();
}

//User validation
export const userValidationChain = [
    body("email").isEmail().withMessage("Email must be a valid email").isLength({ min: 1 }).withMessage("Email is required"),
    body("name").isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("password").isStrongPassword().withMessage("Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];
export const userUpdateValidationChain = [
    body("email").optional().isEmail().withMessage("Email must be a valid email").isLength({ min: 1 }).withMessage("Email is required"),
    body("name").optional().isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("password").optional().isStrongPassword().withMessage("Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];
export function validateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    req.body = userTransformer(req.body);
    next();
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