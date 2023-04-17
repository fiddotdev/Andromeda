// import { NextFunction, Request, Response } from 'express';
// import db from '../database';
//
// async function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
//     const apiKey = req.header('Authorization');
//
//     if (!apiKey) {
//         res.status(401).send({ error: 'API key is required' });
//         return;
//     }
//
//     const user = await db
//         .selectFrom('Users')
//         .select(['f'])
//         .where('apiKey', '=', apiKey)
//         .executeTakeFirst();
//
//     if (!user) {
//         res.status(401).send({ error: 'Invalid API key' });
//         return;
//     }
//
//     next();
// }
//
// export default apiKeyAuth;
