import express from 'express';
import * as commentService from '../services/comment';
import { isAuthorized, isAuthorizedForComments, isAuthorizedForRecipes } from '../middelwares/jwtCheck';
import * as recipeService from "../services/recipe";
import { errorHandler } from '../util/errorHandler';
import { validateComment, validateRating, validateRecipe } from '../middelwares/inputValidation';
import { getRatingFromUser } from '../services/recipe';
import { JWTContent } from '../models/auth';


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

router.get('/random', (req, res) => {
    let categoryId = req.query.category as string;
    let tagId = req.query.tag as string;
    recipeService.getRandomRecipe(categoryId, tagId).then(recipe => {
        res.status(200).json(recipe);
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
    let limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
    let offset: number = req.query.offset ? parseInt(req.query.offset as string) : 0;

    let id: string = req.params.id;
    
    commentService.getAllComments(id, limit, offset).then(comments => {
        res.status(200).json(comments);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.post('/:id/comments', isAuthorized, validateComment, (req, res) => {
    //Set user id
    if (req.jwtContent?.id) {
        req.body.user_id = req.jwtContent.id;
    }
    
    //Set recipeId
    let id: string = req.params.id;
    req.body.recipe_id = id;

    commentService.createComment(req.body).then(comment => {
        res.status(201).json(comment);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/:id/comments/:commentId', (req, res) => {
    commentService.getComment(req.params.commentId, req.params.id).then(comment => {
        res.status(200).json(comment);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.delete('/:id/comments/:commentId', isAuthorizedForComments, (req, res) => {
    commentService.deleteComment(req.params.commentId).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.post('/:id/rating', isAuthorized, validateRating, (req, res) => {
    //Set user id
    if (req.jwtContent?.id) {
        req.body.user_id = req.jwtContent.id;
    }
        
    //Set recipeId
    let id: string = req.params.id;
    req.body.recipe_id = id;

    recipeService.rateRecipe(req.body).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/:id/rating', (req, res) => {
    recipeService.getRecipeRating(req.params.id).then(rating => {
        res.status(200).json(rating);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.get('/:id/ratingStatus', isAuthorized, (req, res) => {
    if (req.jwtContent?.id) {
        req.body.user_id = req.jwtContent.id;
    }
    
    recipeService.getRatingFromUser(req.body.user_id, req.params.id).then(rating => {
        res.status(200).json(rating);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});



export { router as recipeController };
