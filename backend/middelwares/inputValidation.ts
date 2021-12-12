import express from "express";
import { body, validationResult } from 'express-validator';

/**
 * @description Schema for recipe validation
 */
export const recipeValidationChain = [
    body("name").isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long"),
    body("ingredients").isArray().withMessage("Ingredients must be an array"),
    body("tags").isArray().withMessage("Tags must be an array"),
    body("preparation").isString().withMessage("Preparation must be a string").isLength({ min: 1 }).withMessage("Preparation is required"),
    body("difficulty").isString().withMessage("Difficulty must be a string").isLength({ min: 1 }).withMessage("Difficulty is required"),
    body("time").isNumeric().withMessage("Time must be numeric"),
    body("category_name").isString().withMessage("Category_name must be a string").isLength({ min: 1 }).withMessage("Category is required")
];

/**
 * @description Schema for recipe update validation
 */
export const recipeUpdateValidationChain = [
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long"),
    body("ingredients").optional().isArray().withMessage("Ingredients must be an array"),
    body("tags").optional().isArray().withMessage("Tags must be an array"),
    body("preparation").optional().isString().withMessage("Preparation must be a string").isLength({ min: 1 }).withMessage("Preparation must be at least 1 character long"),
    body("difficulty").optional().isString().withMessage("Difficulty must be a string").isLength({ min: 1 }).withMessage("Difficulty must be at least 1 character long"),
    body("time").optional().isNumeric().withMessage("Time must be numeric"),
    body("category_name").optional().isString().withMessage("Category_name must be a string").isLength({ min: 1 }).withMessage("Category must be at least 1 character long")
];

/**
 * @description Schema for user validation
 */
export const tagValidationChain = [
    body("name").isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];

/**
 * @description Schema for category validation
 */
export const categoryValidationChain = [
    body("name").isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];

/**
 * @description Schema for category update validation
 */
export const categoryUpdateValidationChain = [
    body("description").isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];

/**
 * @description Schema for comment validation
 */
export const commentValidationChain = [
    body("text").isString().withMessage("Text must be a string").isLength({ min: 1 }).withMessage("Text is required"),
];

/**
 * @description Schema for rating validation
 */
export const ratingValidationChain = [
    body("vote").isNumeric().withMessage("Rating must be a number").withMessage("Rating must be numeric")
];

/**
 * @description Schema for user validation
 */
export const userValidationChain = [
    body("email").isEmail().withMessage("Email must be a valid email").isLength({ min: 1 }).withMessage("Email is required"),
    body("name").isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("password").isStrongPassword().withMessage("Password must be at least 8 characters long and contain at least one number, one uppercase lowercase letter and one symbol.").isLength({ max: 50 }).withMessage("Password must be at most 50 characters long"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];

/**
 * @description Schema for user update validation
 */
export const userUpdateValidationChain = [
    body("email").optional().isEmail().withMessage("Email must be a valid email").isLength({ min: 1 }).withMessage("Email is required"),
    body("name").optional().isString().withMessage("Name must be a string").isLength({ min: 1 }).withMessage("Name is required"),
    body("password").optional().isStrongPassword().withMessage("Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter").isLength({ max: 50 }).withMessage("Password must be at most 50 characters long"),
    body("description").optional().isString().withMessage("Description must be a string").isLength({ min: 1 }).withMessage("Description must be at least 1 character long")
];

/**
 * @description Schema for login validation
 */
export const loginValidationChain = [
    body("email").isEmail().withMessage("Email must be a valid email").isLength({ min: 1 }).withMessage("Email is required"),
    body("password").isString().withMessage("Password must be a string").isLength({ min: 1 }).withMessage("Password is required")
];

/**
 * Vaidates the request body
 * @param req express request object
 * @param res express response object
 * @param next express next function
 */
export function validateRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

/**
 * Validates picture upload
 * @param req express request object
 * @param res express response object
 * @param next express next function
 */
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