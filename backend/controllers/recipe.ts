import express from 'express';
import { isAuthorized, isAuthorizedAdmin, isAuthorizedUser } from '../middelwares/jwtCheck';
import * as recipeService from "../services/recipe";
import { errorHandler } from '../util/errorHandler';


const router = express.Router();

//Get all recipes
router.get('/', (req, res) => {
    recipeService.getAllRecipes().then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.post('/',isAuthorized, (req, res) => {
    //Set user id
    if(req.jwtContent?.id){
        req.body.userId = req.jwtContent.id;
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

router.patch('/:id', (req, res) => {
    //Get user id
    let userId : string = "";
    if(req.jwtContent?.id){
        userId = req.jwtContent.id;
    }
    
    recipeService.updateRecipe(req.params.id, req.body, userId).then(recipe => {
        res.status(200).json(recipe);
    }).catch(err => {
        errorHandler(err, req, res);
    });

});

router.delete('/:id',isAuthorized, (req, res) => {
    //Get user id
    let userId : string = "";
    if(req.jwtContent?.id){
        userId = req.jwtContent.id;
    }

    //Delete recipe
    recipeService.deleteRecipe(req.params.id, userId).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/:id/comments', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.post('/:id/comments', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.get('/random', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

export {router as recipeController};