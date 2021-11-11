import express from 'express';
import { login, logout } from '../services/auth';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

router.post('/login', (req, res) => {
    login(req.body).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.post('/logout', (req, res) => {
    let jwtToken: string = req.headers['jwt'] as string;
    logout(jwtToken).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

export { router as authController };