import express from 'express';
import * as authService from '../services/auth';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

// @route   GET api/login
// @desc    Get new JWT
// @access  Public
router.post('/login', (req, res) => {
    authService.login(req.body).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   Post api/logout
// @desc    Set JWT on blacklist
// @access  Public
router.post('/logout', (req, res) => {
    let jwtToken: string = req.headers['jwt'] as string;
    authService.logout(jwtToken).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

export { router as authController };