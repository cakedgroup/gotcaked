import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
    res.status(501);
    res.send('Too be implemented.');
});

router.post('/logout', (req, res) => {
    res.status(501);
    res.send('Too be implemented.');
});

export {router as authController};