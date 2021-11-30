import express from 'express';
import path from 'path';

const router = express.Router();

//Serving Images
router.use('/', express.static(path.join(__dirname, 'static')));

//404 Route
router.use((_req: express.Request, res: express.Response) => {
  res.status(404);
  res.json({ "status": "Content does not exist" });
});

export { router as fileServer };
