import dotenv from 'dotenv';
dotenv.config();

export type EnvConfig = {
  POSTGRES_HOST: string;
  POSTGRES_USERNAME: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_PORT: number;
  POSTGRES_DB: string;
  FARCASTER_RPC_URL: string;
  FARCASTER_RPC_PORT: string;
  JWT_KEY: string;
};

const envProvider: EnvConfig = {
  POSTGRES_HOST: process.env.POSTGRES_HOST ?? '',
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME ?? '',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? '',
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT ?? '', 10),
  POSTGRES_DB: process.env.POSTGRES_DB ?? '',
  FARCASTER_RPC_URL: process.env.FARCASTER_RPC_URL ?? '',
  FARCASTER_RPC_PORT: process.env.FARCASTER_RPC_PORT ?? '',
  JWT_KEY: process.env.JWT_KEY ?? '',
};

function validateConfig(config: EnvConfig) {
  const missingVars: string[] = [];

  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'undefined' || value === '') {
      missingVars.push(key);
    }
  }

  if (missingVars.length) {
    throw new Error(
      `The following environment variables are not set: ${missingVars.join(
        ', '
      )}`
    );
  }
}

validateConfig(envProvider);

export default envProvider;
