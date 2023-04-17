import { Request, Response, NextFunction } from 'express';
import db from '../database';

export function validateAPIKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Validate API key");
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    console.log(authHeader);
    const token = authHeader.split(' ')[1];

    console.log("fetching");
    db.selectFrom('keys')
      .selectAll()
      .where('keys.key', '=', token)
      .execute()
      .then((result) => {
        console.log("next");
        res.locals.farcasterNetwork = String(result[0].network);
        next();
      })
      .catch((_) => {
        res.sendStatus(401);
      });
  } else {
    res.sendStatus(401);
  }
}
