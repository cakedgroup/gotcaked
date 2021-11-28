import express from 'express';
import { isAuthorizedAdmin } from '../middelwares/jwtCheck';
import * as categoryService from '../services/category';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

// @route   GET api/categories/
// @desc    Get all categories
// @access  Public
router.get('/', (req, res) => {
    categoryService.getAllCategories().then(categories => {
        res.status(200).json(categories);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   POST api/categories/
// @desc    Create a category
// @access  Admin
router.post('/', isAuthorizedAdmin, (req, res) => {
    categoryService.createCategory(req.body).then(category => {
        res.status(201).json(category);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/categories/:name
// @desc    Get a category by name
// @access  Public
router.get('/:name', (req, res) => {
    categoryService.getCategoryById(req.params.name).then(category => {
        res.status(200).json(category);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   PUT api/categories/:name
// @desc    Update a category
// @access  Admin
router.put('/:name', isAuthorizedAdmin, (req, res) => {
    categoryService.updateCategory(req.params.name, req.body).then(category => {
        res.status(200).json(category);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   DELETE api/categories/:name
// @desc    Delete a category
// @access  Admin
router.delete('/:name', isAuthorizedAdmin, (req, res) => {
    categoryService.deleteCategory(req.params.name).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/categories/random
// @desc    Get a random category
// @access  Public
router.get('/random', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export {router as categoryController};