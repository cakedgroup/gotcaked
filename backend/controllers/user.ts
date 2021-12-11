import express from 'express';
import { userUpdateValidationChain, userValidationChain, validatePicture, validateRequest } from '../middelwares/inputValidation';
import { isAuthorizedUser } from '../middelwares/jwtCheck';
import * as userService from '../services/user';
import * as recipeService from '../services/recipe';
import { errorHandler } from '../util/errorHandler';

const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req: express.Request, res: express.Response) => {
    let limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
    let offset: number = req.query.offset ? parseInt(req.query.offset as string) : 0;

    //Get All Users from Service
    userService.getAllUsers(limit, offset).then(users => {
        res.status(200).json(users);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   POST api/users
// @desc    Create new user
// @access  Public
router.post('/', userValidationChain, validateRequest, (req: express.Request, res: express.Response) => {
    //Create User in Service
    userService.createUser(req.body).then(user => {
        res.status(201);
        res.json(user);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/users/:id
// @desc    Get user with id
// @access  Public
router.get('/:id', (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    //Get User from Service
    userService.getUserById(id).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   PATCH api/users/:id
// @desc    Update user with id
// @access  User
router.patch('/:id', isAuthorizedUser, userUpdateValidationChain, validateRequest, (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    //Update User in Service
    userService.updateUser(id, req.body).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        errorHandler(err, req, res);
    });

});

// @route   PATCH api/users/:id/picture
// @desc    Upload a new profile picture
// @access  User
router.patch('/:id/picture', isAuthorizedUser, validatePicture, (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    userService.setPicture(id, req.files.picture).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   DELETE api/users/:id
// @desc    Delete user with id
// @access  User
router.delete('/:id', isAuthorizedUser, (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;
    //Store JWT to Blacklist JWT
    let jwtToken: string = req.headers['jwt'] as string;
    let blockJWT: boolean = false;
    if (req.jwtContent) {
        if (req.jwtContent.role === "user") {
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


// @route   DELETE api/users/:id/picture
// @desc    Delete Users profile picture
// @access  User
router.delete('/:id/picture', isAuthorizedUser, (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    //Delete User Picture in Service
    userService.deletePicture(id).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});


// @route   GET api/users/random
// @desc    Get random user
// @access  Public
router.get('/random', (req: express.Request, res: express.Response) => {
    //Get Random User from Service
    userService.getRandomUser().then(user => {
        res.status(200).json(user);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/users/:id/recipes
// @desc    Get all recipes of user
// @access  Public
router.get('/:id/recipes', (req: express.Request, res: express.Response) => {
    //Get All Recipes of User from Service
    recipeService.getRecipesFromUser(req.params.id).then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/users/:id/liked
// @desc    Get all liked recipes of user
// @access  Public
router.get('/:id/liked', (req: express.Request, res: express.Response) => {
    //Get all liked recipes of user from Service
    recipeService.getLikedRecipesFromUser(req.params.id).then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/users/:id/list
// @desc    Get all recipes on list of user
// @access  Public
router.get('/:id/list', (req: express.Request, res: express.Response) => {
    res.status(501);
    res.send('To be implemented.');
});

export { router as userController };
