import express from 'express';
import { authenticateJwt } from '../middleware/authJWT';
import crypto from 'crypto';
import { KeysTable, Network } from '../database/models';
import { v4 } from 'uuid';
import db from '../database';
import { Result } from '../types/Result';

export const keysRouter = express.Router();

interface Locals {
  fid: number;
  publicKey: string;
}

interface NewKeyRequest {
  network: Network;
}

keysRouter.get('/all', authenticateJwt, async (req, res) => {
  const { fid } = res.locals as Locals;

  const keys = await db
    .selectFrom('keys')
    .selectAll()
    .where('keys.fid', '=', fid)
    .execute();

  const result: Result = {
    status: 200,
    data: {
      keys,
    },
  };

  return res.status(result.status).json(result);
});
keysRouter.post(`/new`, authenticateJwt, async (req, res) => {
  const { network } = req.body as NewKeyRequest;
  const { fid } = res.locals as Locals;
  const randomBytes = crypto.randomBytes(32);

  // Encode the random buffer as a URL-safe Base64 string
  const apiKey = randomBytes
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  if (!network || !(network in Network)) {
    return res.status(400).json({
      status: 400,
      data: 'Please provide a valid network',
    });
  }

  const newKey: KeysTable = {
    id: String(v4()),
    key: apiKey,
    network,
    fid,
    created_at: new Date(),
    updated_at: new Date(),
  };

  await db.insertInto('keys').values(newKey).execute();
  const result: Result = {
    status: 201,
    data: {
      key: apiKey,
    },
  };

  return res.status(result.status).json(result);
});
