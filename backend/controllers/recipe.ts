import express from 'express';
import { validateComment, validatePicture, validateRating, validateRecipe } from '../middelwares/inputValidation';
import { isAuthorized, isAuthorizedForComments, isAuthorizedForRecipes } from '../middelwares/jwtCheck';
import * as commentService from '../services/comment';
import * as recipeService from "../services/recipe";
import { errorHandler } from '../util/errorHandler';


const router = express.Router();

// @route   GET api/recipes
// @desc    Get all recipes
// @access  Public
router.get('/', (req, res) => {
    let limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
    let offset: number = req.query.offset ? parseInt(req.query.offset as string) : 0;

    recipeService.getAllRecipes(limit, offset).then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// @route   POST api/recipes
// @desc    Create a recipe
// @access  User
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

// @route   GET api/recipes/:id
// @desc    Get recipe with id
// @access  Public
router.get('/:id', (req, res) => {
    recipeService.getRecipe(req.params.id).then(recipe => {
        res.status(200).json(recipe);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   PATCH api/recipes/:id
// @desc    Update recipe with id
// @access  Author of Recipe
router.patch('/:id', isAuthorizedForRecipes, (req, res) => {
    recipeService.updateRecipe(req.params.id, req.body).then(recipe => {
        res.status(200).json(recipe);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.patch('/:id/picture', isAuthorizedForRecipes, validatePicture, (req, res) => {
    let id: string = req.params.id;

    //Update User Picture in Service
    recipeService.addPicture(id, req.files.picture).then(recipe => {
        res.status(200).json(recipe);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   DELETE api/recipes/:id
// @desc    Delete recipe with id
// @access  Author of Recipe
router.delete('/:id', isAuthorizedForRecipes, (req, res) => {
    //Delete recipe
    recipeService.deleteRecipe(req.params.id).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

router.delete('/:id/picture/', isAuthorizedForRecipes, (req, res) => {
    let id: string = req.params.id;
    let pictureID: string = req.body.picture_uri as string;

    //Delete User Picture in Service
    recipeService.deletePicture(id, pictureID).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});


// @route   GET api/recipes/:id/comments
// @desc    Get comments of recipe
// @access  Public
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

// @route   POST api/recipes/:id/comments
// @desc    Create comment on recipe
// @access  User
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

// @route   GET api/recipes/:id/comments/:commentId
// @desc    Get comment with commentId on recipe with id
// @access  Public
router.get('/:id/comments/:commentId', (req, res) => {
    commentService.getComment(req.params.commentId, req.params.id).then(comment => {
        res.status(200).json(comment);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   DELETE api/recipes/:id/comments/:commentId
// @desc    Delete comment with commentId on recipe with id
// @access  Author of comment
router.delete('/:id/comments/:commentId', isAuthorizedForComments, (req, res) => {
    commentService.deleteComment(req.params.commentId).then(() => {
        res.status(204).send();
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   POST api/recipes/:id/rating
// @desc    Create rating on recipe with id
// @access  User
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

// @route   GET api/recipes/:id/rating
// @desc    Get rating of recipe with id
// @access  Public
router.get('/:id/rating', (req, res) => {
    recipeService.getRecipeRating(req.params.id).then(rating => {
        res.status(200).json(rating);
    }).catch(err => {
        errorHandler(err, req, res);
    });
});

// @route   GET api/recipes/:id/ratingStatus
// @desc    Get rating status of user on recipe with id 
// @access  User
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
