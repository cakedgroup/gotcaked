import express from 'express';
import { isAuthorizedUser } from '../middelwares/jwtCheck';
import * as commentService from '../services/comment';
import { isAuthorized, isAuthorizedForRecipes } from '../middelwares/jwtCheck';
import * as recipeService from "../services/recipe";
import { errorHandler } from '../util/errorHandler';
import { validateRecipe } from '../middelwares/inputValidation';


const router = express.Router();

//Get all recipes
router.get('/', (req, res) => {
    let limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
    let offset: number = req.query.offset ? parseInt(req.query.offset as string) : 0;

    recipeService.getAllRecipes(limit, offset).then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.post('/', isAuthorized, validateRecipe, (req, res) => {
    //Set user id
    if (req.jwtContent?.id) {
        req.body.user_id = req.jwtContent.id;
    }
    //Create recipe
    recipeService.createRecipe(req.body).then(recipe => {
        res.status(201).json(recipe);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/:id', (req, res) => {
    recipeService.getRecipe(req.params.id).then(recipe => {
        res.status(200).json(recipe);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.patch('/:id', isAuthorizedForRecipes, (req, res) => {
    recipeService.updateRecipe(req.params.id, req.body).then(recipe => {
        res.status(200).json(recipe);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.delete('/:id', isAuthorizedForRecipes, (req, res) => {
    //Delete recipe
    recipeService.deleteRecipe(req.params.id).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/:id/comments', (req, res) => {
    let id: string = req.params.id;
    
    commentService.getComments(id).then(comments => {
        res.status(200).json(comments);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.post('/:id/comments', isAuthorizedUser, (req, res) => {
    let id: string = req.params.id;
    req.body.recipeId = id;

    commentService.createComment(req.body).then(comment => {
        res.status(201).json(comment);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/random', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export { router as recipeController };
