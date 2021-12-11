import express from 'express';
import { tagValidationChain, validateRequest } from '../middelwares/inputValidation';
import { isAuthorizedAdmin } from '../middelwares/jwtCheck';
import * as tagService from '../services/tag';
import * as recipeService from '../services/recipe';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

// @route   GET api/tags
// @desc    Get all tags
// @access  Public
router.get('/', (req: express.Request, res: express.Response) => {
    tagService.getAllTags().then(tags => {
        res.status(200).json(tags);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   POST api/tags/
// @desc    Create a tag
// @access  Admin
router.post('/', isAuthorizedAdmin, tagValidationChain, validateRequest, (req: express.Request, res: express.Response) => {
    tagService.createTag(req.body).then(tag => {
        res.status(201).json(tag);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/tags/:name
// @desc    Get a tag by name
// @access  Public
router.get('/:name', (req: express.Request, res: express.Response) => {
    tagService.getTagByName(req.params.name).then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/tags/:name/recipes
// @desc    Get all Recipes by a Tag
// @access  Public
router.get('/:name/recipes', (req: express.Request, res: express.Response) => {
    let limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
    let offset: number = req.query.offset ? parseInt(req.query.offset as string) : 0;

    recipeService.getRecipesByTag(req.params.name, limit, offset).then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   DELETE api/tags/:name
// @desc    Delete a tag
// @access  Admin
router.delete('/:name', isAuthorizedAdmin, (req: express.Request, res: express.Response) => {
    tagService.deleteTag(req.params.name).then(tag => {
        res.status(204).json(tag);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/random', (req: express.Request, res: express.Response) => {
    res.status(501);
    res.send('To be implemented.');
});

export { router as tagController };
