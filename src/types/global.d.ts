declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_HOST: string;
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: string;
    POSTGRES_DB: string;
    HASH_KEY: string;
    FARCASTER_RPC_URL: string;
    FARCASTER_RPC_PORT: string;
  }
}
