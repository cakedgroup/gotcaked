import express from 'express';

const router = express.Router();

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

router.get('/random', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export {router as categoryController};