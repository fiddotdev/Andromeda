import express from 'express';
import { authRouter } from './routes/auth';
import { migrateToLatest } from './scripts/migrate';
import cors from 'cors';
import { keysRouter } from './routes/keys';
import { farcasterRouter } from './routes/farcaster';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/keys', keysRouter);
app.use('/farcaster', farcasterRouter);

migrateToLatest().then((_) => {
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });

  app.get('/', (req, res) => {
    return res.status(200).send('Hello Universe!');
  });
});
