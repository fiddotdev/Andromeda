import express from 'express';
import { validateAPIKey } from '../middleware/validateAPIKey';
import { farcasterClient, mainnetFarcasterClient } from '../farcaster/Client';
import { Network } from '../database/models';
import { UserDataType } from '@farcaster/hub-nodejs';

export const farcasterRouter = express.Router();

interface CastsQuery {
  fid: number;
}

farcasterRouter.get('/', validateAPIKey, async (req, res) => {
  res
    .status(200)
    .send(
      'Farcaster is a sufficiently decentralized social network. https://farcaster.xyz'
    );
});

farcasterRouter.get('/castsbyfid', validateAPIKey, async (req, res) => {
  const { fid } = req.query as Partial<CastsQuery>;

  if (!fid) return res.status(400).json({ status: 400, data: 'Missing FID' });

  const network: Network = res.locals.farcasterNetwork as Network;

  if (network === Network.Testnet) {
    console.log('fetching user information');
    const casts = await farcasterClient.getCastsByFid({
      fid,
      pageSize: 50,
    });
    if (casts.isOk()) {
      const castMessages = casts.value;

      return res.status(200).json({
        status: 200,
        data: castMessages,
      });
    } else {
      console.log(casts.error);
      return res.status(500).json({
        status: 500,
        data: 'Internal Server Error',
      });
    }
  } else if (network === Network.Mainnet) {
    console.log('Fetching casts');
    const casts = await mainnetFarcasterClient.getCastsByFid({
      fid,
      pageSize: 50,
    });
    console.log('Fetched casts');
    if (casts.isOk()) {
      const castMessages = casts.value;

      return res.status(200).json({
        status: 200,
        data: castMessages,
      });
    } else {
      console.error(casts.error);
      return res.status(500).json({
        status: 500,
        data: 'Internal Server Error',
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      data: 'Please provide a valid network',
    });
  }
});
