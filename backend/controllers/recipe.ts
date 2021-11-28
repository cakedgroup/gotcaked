import express from 'express';
import * as commentService from '../services/comment';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

//Get all recipes
router.get('/', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.post('/', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.get('/:id', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.patch('/:id', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.delete('/:id', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.get('/:id/comments', (req, res) => {
    let id: string = req.params.id;
    
    commentService.getComments(id).then(comments => {
        res.status(200).json(comments);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.post('/:id/comments', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.get('/random', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export {router as recipeController};