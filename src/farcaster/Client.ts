import { getInsecureHubRpcClient } from '@farcaster/hub-nodejs';
import envProvider from '../providers/EnvProvider';

const farcasterClient = getInsecureHubRpcClient(
  `${envProvider.FARCASTER_RPC_URL}:${envProvider.FARCASTER_RPC_PORT}`
);

const mainnetFarcasterClient = getInsecureHubRpcClient(
  `${envProvider.MAINNET_FARCASTER_RPC_URL}:${envProvider.MAINNET_FARCASTER_RPC_PORT}`
);

export { farcasterClient, mainnetFarcasterClient };
