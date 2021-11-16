import express from 'express';
import * as userService from '../services/user';
import { isAuthorizedUser } from '../middelwares/jwtCheck';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

router.get('/', (req, res) => {
    let limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
    let offset: number = req.query.offset ? parseInt(req.query.offset as string) : 0;

    //Get All Users from Service
    userService.getAllUsers(limit, offset).then(users => {
        res.status(200).json(users);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.post('/', (req, res) => {
    //Create User in Service
    userService.createUser(req.body).then(user => {
        res.status(201);
        res.json(user);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/:id', (req, res) => {
    let id: string = req.params.id;

    //Get User from Service
    userService.getUserById(id).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.patch('/:id', isAuthorizedUser, (req, res) => {
    let id: string = req.params.id;

    //Update User in Service
    userService.updateUser(id, req.body).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        errorHandler(err, req, res);
    });

});

router.delete('/:id', isAuthorizedUser, (req, res) => {
    let id: string = req.params.id;

    //Delete User in Service
    userService.deleteUser(id).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
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
