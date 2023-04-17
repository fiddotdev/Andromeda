export enum Network {
  Mainnet = 'Mainnet',
  Testnet = 'Testnet',
}

export enum SignerStatus {
  Active = 'active',
  Pending = 'pending',
  Expired = 'expired',
}

export enum SignEventStatus {
  Accepted = 'accepted',
  Denied = 'denied',
}

export interface UsersTable {
  fid: number;
  fname: string;
  pfpURL?: string;
  signerId: string;
  created_at: Date;
  updated_at: Date;
}

export interface SignersTable {
  id: string;
  fid: number;
  pubkey: string;
  status: SignerStatus;
  created_at: Date;
  updated_at: Date;
}

export interface SignEventsTable {
  id: string;
  signer_id: string;
  content: string;
  status: SignEventStatus;
  status_reason: string;
  created_at: Date;
  updated_at: Date;
}

export interface KeysTable {
  id: string;
  key: string;
  network: Network;
  fid: number;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  users: UsersTable;
  signers: SignersTable;
  sign_events: SignEventsTable;
  keys: KeysTable;
}
