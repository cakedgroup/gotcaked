import express from "express";

/**
 * Log express request to console
 * @param req express request
 * @param _res express response
 * @param next express next function
 */
export function logToConsole(req: express.Request, _res: express.Response, next: express.NextFunction) {
  console.log(`${req.method} Request on ${req.url}`);
  next();
}
