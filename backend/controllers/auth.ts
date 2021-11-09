import express from 'express';
import { login, logout } from '../services/auth';

const router = express.Router();

router.post('/login', (req, res) => {
    login(req.body).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.post('/logout', (req, res) => {
    let jwtToken: string = req.headers['jwt'] as string;
    logout(jwtToken).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
});

export { router as authController };