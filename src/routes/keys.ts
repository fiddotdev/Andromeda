// import express from 'express';
// import apiKeyAuth from '../middleware/apiKeyAuth';
// import db from '../database';
// import { KeysTable } from '../database/models';
// import { v4 as uuidv4 } from 'uuid';
// import crypto from 'crypto';
//
// export const keysRouter = express.Router();
//
// keysRouter.use(apiKeyAuth);
//
// keysRouter.post('/new', async (req, res) => {
//     const { network } = req.body;
//     const { username } = req;
//
//     if (!network || !['Testnet', 'Mainnet'].includes(network)) {
//         res.status(400).send({ error: 'Valid network is required: Testnet or Mainnet' });
//         return;
//     }
//
//     const keyId = uuidv4();
//     const apiKey = crypto.randomBytes(32).toString('hex');
//
//     const newKey: KeysTable = {
//         id: keyId,
//         apiKey,
//         network,
//         userId: username,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     };
//
//     try {
//         await db.insertInto('keys').values(newKey).execute();
//         res.status(201).send({ apiKey });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ error: 'Failed to generate API key' });
//     }
// });
