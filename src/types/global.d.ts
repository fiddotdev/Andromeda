declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_HOST: string;
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: string;
    POSTGRES_DB: string;
    FARCASTER_RPC_URL: string;
    FARCASTER_RPC_PORT: string;
    MAINNET_FARCASTER_RPC_URL: string;
    MAINNET_FARCASTER_RPC_PORT: string;
    JWT_KEY: string;
  }
}
