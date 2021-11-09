import express from 'express';
import { login } from '../services/auth';

const router = express.Router();

router.post('/login', (req, res) => {
    login(req.body).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.post('/logout', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export {router as authController};