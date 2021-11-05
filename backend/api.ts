import express from 'express'
import * as logger from './util/logger';
import cors from 'cors';
import { echoController } from './controllers/echo';
import { statusController } from './controllers/status';
import { welcomeController } from './controllers/main';
import { userController } from './controllers/user';
import { categoryController } from './controllers/category';
import { tagController } from './controllers/tag';
import { recipeController } from './controllers/recipe';
import { authController } from './controllers/auth';
const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(logger.logToConsole);

router.use('/echo', echoController);

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
  res.json({"status": "Route does not exist"});
  res.send();
});

export { router as apiRouter }
