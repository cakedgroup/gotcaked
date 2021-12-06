import express from 'express';
import { validateTag } from '../middelwares/inputValidation';
import { isAuthorizedAdmin } from '../middelwares/jwtCheck';
import * as tagService from '../services/tag';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

// @route   GET api/tags
// @desc    Get all tags
// @access  Public
router.get('/', (req, res) => {
    tagService.getAllTags().then(tags => {
        res.status(200).json(tags);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   POST api/tags/
// @desc    Create a tag
// @access  Admin
router.post('/', isAuthorizedAdmin, validateTag, (req, res) => {
    tagService.createTag(req.body).then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/tags/:name
// @desc    Get a tag by name
// @access  Public
router.get('/:name', (req, res) => {
    tagService.getTagByName(req.params.name).then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/tags/:name/recipes
// @desc    Get all Recipes by a Tag
// @access  Public
router.get('/:name/recipes', (req, res) => {
    let limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
    let offset: number = req.query.offset ? parseInt(req.query.offset as string) : 0;

    tagService.getRecipesByTag(req.params.name, limit, offset).then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   DELETE api/tags/:name
// @desc    Delete a tag
// @access  Admin
router.delete('/:name', isAuthorizedAdmin, (req, res) => {
    tagService.deleteTag(req.params.name).then(tag => {
        res.status(204).json(tag);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/random', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export { router as tagController };
