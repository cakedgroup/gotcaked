import express from 'express';
import * as recipeService from "../services/recipe";


const router = express.Router();

//Get all recipes
router.get('/', (req, res) => {
    recipeService.getAllRecipes().then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.post('/', (req, res) => {
    recipeService.createRecipe(req.body).then(recipe => {
        res.status(200).json(recipe);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {
    recipeService.getRecipe(req.params.id).then(recipe => {
        res.status(200).json(recipe);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.patch('/:id', (req, res) => {
    res.status(501);
    res.send('To be implemented.');
});

router.delete('/:id', (req, res) => {
    recipeService.deleteRecipe(req.params.id).then(() => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send(err);
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