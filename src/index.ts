import express from 'express';
import { authRouter } from './routes/auth';
import { migrateToLatest } from './scripts/migrate';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRouter);

migrateToLatest().then((_) => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
