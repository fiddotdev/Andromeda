import { Request, Response, NextFunction } from 'express';
import db from '../database';

export function validateAPIKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    db.selectFrom('keys')
      .selectAll()
      .where('keys.key', '=', token)
      .execute()
      .then((result) => {
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
