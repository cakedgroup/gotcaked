import express from "express";

export function logToConsole(req: express.Request, _res: express.Response, next: express.NextFunction) {
  console.log(`${req.method} Request on ${req.url}`);
  next();
}
