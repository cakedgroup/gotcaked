import express from 'express';
import {getTags} from '../storage/tag';

const router = express.Router();

router.get('/', (req, res) => {
    getTags().then(tags => {
        res.status(200).json(tags);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
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

router.get('/random', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export {router as tagController};