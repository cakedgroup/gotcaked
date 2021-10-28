import express from "express";
import * as echoService from '../services/echo';
const router = express.Router();

router.post('/', validateEcho, (req, res) => {
  const message = req.body.message;

  echoService.saveEcho(message, (err: Error | null, data: any) => {
    if (err) {
      res.status(500);
      res.send(err.message);
    } else {
      res.send(data);
    }
  });
});
router.get('/', (req, res) => {
  const containsString = req.query.contains;
  echoService.listEchos(containsString, (err: Error | null, data: any) => {
    if (err) {
      res.status(500);
      res.send(err.message);
    } else {
      res.send(data);
    }
  });
});

function validateEcho(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.body.message) {
    next();
  } else {
    res.status(400);
    res.send('Body validation failed');
  }
}

export { router as echoController }
