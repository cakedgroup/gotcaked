import express from 'express';
import { categoryValidationChain, validateRequest } from '../middelwares/inputValidation';
import { isAuthorizedAdmin } from '../middelwares/jwtCheck';
import * as categoryService from '../services/category';
import * as recipeService from '../services/recipe';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

// @route   GET api/categories/
// @desc    Get all categories
// @access  Public
router.get('/', (req: express.Request, res: express.Response) => {
    categoryService.getAllCategories().then(categories => {
        res.status(200).json(categories);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   POST api/categories/
// @desc    Create a category
// @access  Admin
router.post('/', isAuthorizedAdmin, categoryValidationChain, validateRequest, (req: express.Request, res: express.Response) => {
    categoryService.createCategory(req.body).then(category => {
        res.status(201).json(category);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/categories/:name
// @desc    Get a category by name
// @access  Public
router.get('/:name', (req: express.Request, res: express.Response) => {
    categoryService.getCategoryById(req.params.name).then(category => {
        res.status(200).json(category);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/categories/:name
// @desc    Get all Recipes by a category
// @access  Public
router.get('/:name/recipes', (req: express.Request, res: express.Response) => {
    let limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
    let offset: number = req.query.offset ? parseInt(req.query.offset as string) : 0;

    recipeService.getRecipesByCategory(req.params.name, limit, offset).then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   PUT api/categories/:name
// @desc    Update a category
// @access  Admin
router.put('/:name', isAuthorizedAdmin, categoryValidationChain, validateRequest, (req: express.Request, res: express.Response) => {
    categoryService.updateCategory(req.params.name, req.body).then(category => {
        res.status(200).json(category);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   DELETE api/categories/:name
// @desc    Delete a category
// @access  Admin
router.delete('/:name', isAuthorizedAdmin, (req: express.Request, res: express.Response) => {
    categoryService.deleteCategory(req.params.name).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

export { router as categoryController };
