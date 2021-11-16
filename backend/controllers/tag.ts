import express from 'express';
import {getTags} from '../storage/tag';
import * as tagService from '../services/tag';

const router = express.Router();

// @route   GET api/tags
// @desc    Get all tags
// @access  Public
router.get('/', (req, res) => {
    tagService.getAllTags().then(tags => {
        res.status(200).json(tags);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// @route   POST api/tags/
// @desc    Create a tag
// @access  Authorized Users
router.post('/', (req, res) => {
    tagService.createTag(req.body).then(tag => {
        res.status(200).json(tag);
    }).then(err => {
        res.status(500).json(err);
    });
});

// @route   GET api/tags/:name
// @desc    Get a tag by name
// @access  Public
router.get('/:name', (req, res) => {
    tagService.getTagByName(req.params.name).then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// @route   PUT api/tags/:name
// @desc    Update a tag
// @access  Authorized Users
router.put('/:name', (req, res) => {
    tagService.updateTag(req.params.name, req.body).then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// @route   DELETE api/tags/:name
// @desc    Delete a tag
// @access  Authorized Users
router.delete('/:name', (req, res) => {
    tagService.deleteTag(req.params.name).then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/random', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export {router as tagController};