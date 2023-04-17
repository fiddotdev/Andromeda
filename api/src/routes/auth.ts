import express from 'express';
import { SignersTable, SignerStatus, UsersTable } from '../database/models';
import requireFields from '../middleware/requireFields';
import { Result } from '../types/Result';
import db from '../database';

export const authRouter = express.Router();

interface AuthRequest {
  fid: number;
  pubkey: string;
}

const requiredFields: (keyof AuthRequest)[] = ['fid', 'pubkey'];

authRouter.use(requireFields(requiredFields));

authRouter.post('/', async (req, res) => {
  const { fid, pubkey } = req.body as AuthRequest;

  const aaa: SignersTable = {
    id: '1',
    fid,
    pubkey,
    status: SignerStatus.Active,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const newUser: UsersTable = {
    fid,
    fname: 'tst',
    signerId: 'lol',
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    // On auth:
    // Best way to authenticate here, post-verification (like days later)
    // Get public key and private key
    // Ensure that the keys match
    // Use the getSigner Hub Method and pass the fid and public key, if it returns, then we're authenticated

    await db.insertInto('signers').values(aaa).execute();
    await db.insertInto('users').values(newUser).execute();
    const result: Result = {
      status: 201,
      data: 'Created User',
    };

    res.status(result.status).send(result);
  } catch (err) {
    console.error(err);
    const result: Result = {
      status: 500,
      data: 'Internal Server Error',
    };
    return res.status(result.status).json(result);
  }
});
