import express from 'express';
import { createUserService } from '../services/user';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.post('/', (req, res) => {
    createUserService(req.body).then(user => {
        res.status(201);
        res.json(user);
    }).catch(err => {
        res.status(400);
        res.json({ message: "User already exists." });
    });
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

router.get('/:id/recipes', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.get('/:id/liked', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.get('/:id/list', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export { router as userController };