import cors from 'cors';
import express from 'express';
import { authController } from './controllers/auth';
import { categoryController } from './controllers/category';
import { welcomeController } from './controllers/main';
import { recipeController } from './controllers/recipe';
import { statusController } from './controllers/status';
import { tagController } from './controllers/tag';
import { userController } from './controllers/user';
import { checkJWT } from './middelwares/jwtCheck';
import * as logger from './middelwares/logger';
import { JWTContent } from './models/auth';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(logger.logToConsole);
router.use(checkJWT);

declare module 'express-serve-static-core'{
    interface Request {
      jwtContent?: JWTContent;
    }
}

router.use('/', welcomeController);
router.use('/status', statusController);
router.use('/users', userController);
router.use('/categories', categoryController);
router.use('/tags', tagController);
router.use('/recipes', recipeController);
router.use('/auth', authController);

//404 Route
router.use((_req: express.Request, res: express.Response) => {
  res.status(404);
  res.json({ "status": "Route does not exist" });
});



export { router as apiRouter };

