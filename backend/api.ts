import express from 'express'
import { echoController } from './controllers/echo';
import * as logger from './util/logger';
import cors from 'cors';
import { statusController } from './controllers/status';
import { welcomeController } from './controllers/main';
const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(logger.logToConsole);

router.use('/', welcomeController);
router.use('/status', statusController);
router.use('/echo', echoController);

//404 Route
router.use((_req: express.Request, res: express.Response) => {
  res.status(404);
  res.json({"status": "Route does not exist"});
  res.send();
});

export { router as apiRouter }
