import express from 'express';
import { isAuthorizedUser } from '../middelwares/jwtCheck';
import * as userService from '../services/user';
import { errorHandler } from '../util/errorHandler';
import * as jwt from 'jsonwebtoken';
import { JWTContent } from '../models/auth';

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

router.patch('/:id/picture', isAuthorizedUser, (req, res) => {
    let id: string = req.params.id;

    if (req.files) {
        if (req.files.picture) {
            //Update User Picture in Service
            userService.setPicture(id, req.files.picture).then(user => {
                res.status(200).json(user);
            }).catch(err => {
                errorHandler(err, req, res);
            });
        } else {
            errorHandler(new Error('Wrong file uploaded'), req, res);
        }
    } else {
        errorHandler(new Error('No file uploaded'), req, res);
    }
});

router.delete('/:id', isAuthorizedUser, (req, res) => {
    let id: string = req.params.id;
    //Store JWT to Blacklist JWT
    let jwtToken: string = req.headers['jwt'] as string;
    let blockJWT: boolean = false;
    if (req.jwtContent){
        if (req.jwtContent.role === "user"){
            blockJWT = true;
        }
    }

    //Delete User in Service
    userService.deleteUser(id, blockJWT, jwtToken).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.delete('/:id/picture', isAuthorizedUser, (req, res) => {
    let id: string = req.params.id;

    //Delete User Picture in Service
    userService.deletePicture(id).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});


router.get('/random', (req, res) => {
    //Get Random User from Service
    userService.getRandomUser().then(user => {
        res.status(200).json(user);
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
