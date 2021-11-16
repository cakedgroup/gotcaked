import express from 'express';
import {getTags} from '../storage/tag';
import * as tagService from '../services/tag';
import { isAuthorizedUser } from '../middelwares/jwtCheck';
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
// @access  Authorized Users
router.post('/', isAuthorizedUser, (req, res) => {
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

// @route   PUT api/tags/:name
// @desc    Update a tag
// @access  Authorized Users
router.put('/:name', isAuthorizedUser, (req, res) => {
    tagService.updateTag(req.params.name, req.body).then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   DELETE api/tags/:name
// @desc    Delete a tag
// @access  Authorized Users
router.delete('/:name', isAuthorizedUser, (req, res) => {
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

export {router as tagController};