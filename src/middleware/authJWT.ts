import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import envProvider from '../providers/EnvProvider';

interface JwtPayload {
  fid: number;
  publicKey: string;
  iat: number;
  exp: number;
}

export function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const payload = jwt.verify(token, envProvider.JWT_KEY) as JwtPayload;
    res.locals.fid = payload.fid;
    res.locals.publicKey = payload.publicKey;
    next();
  } else {
    res.sendStatus(401);
  }
}
