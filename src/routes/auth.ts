import express from 'express';
import axios from 'axios';
import { SignersTable, SignerStatus, UsersTable } from '../database/models';
import { v4 } from 'uuid';
import db from '../database';
import { Result } from '../types/Result';
import jwt from 'jsonwebtoken';
import envProvider from '../providers/EnvProvider';

export const authRouter = express.Router();

interface AuthRequest {
  publicKey: string;
  token: string;
}

authRouter.get('/new', async (req, res) => {
  const { publicKey, token } = req.query as Partial<AuthRequest>;

  if (!publicKey || !token) {
    return res
      .status(400)
      .send('Missing required fields: publicKey and/or token.');
  }

  const signerRequest = await axios
    .get(`https://api.warpcast.com/v2/signer-request`, {
      params: {
        token,
      },
    })
    .then((response) => response.data.result.signerRequest);

  if (signerRequest.base64SignedMessage) {
    console.log('Signer was approved with fid ', signerRequest.fid);
    const newSigner: SignersTable = {
      id: String(v4()),
      fid: signerRequest.fid,
      pubkey: publicKey,
      status: SignerStatus.Active,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const newUser: UsersTable = {
      fid: signerRequest.fid,
      fname: 'example',
      signerId: newSigner.id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await db
      .updateTable('signers')
      .set({ status: SignerStatus.Expired })
      .where('signers.fid', '=', signerRequest.fid)
      .execute();

    await db.insertInto('signers').values(newSigner).execute();
    await db
      .insertInto('users')
      .values(newUser)
      .onConflict((conflict) =>
        conflict.column('fid').doUpdateSet({
          signerId: newSigner.id,
          updated_at: new Date(),
        })
      )
      .execute();

    const jwtPayload = {
      fid: signerRequest.fid,
      publicKey: publicKey,
    };

    const token = jwt.sign(jwtPayload, envProvider.JWT_KEY, {
      expiresIn: '1h',
    });

    const result: Result = {
      status: 201,
      data: {
        status: 'successful',
        fid: signerRequest.fid,
        token,
      },
    };

    return res.status(result.status).json(result);
  } else {
    const result: Result = {
      status: 200,
      data: {
        status: 'awaiting_signature',
      },
    };

    return res.status(result.status).json(result);
  }
});
