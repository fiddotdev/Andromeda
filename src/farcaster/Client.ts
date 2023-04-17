import { getInsecureHubRpcClient } from '@farcaster/hub-nodejs';
import envProvider from "../providers/EnvProvider";

const farcasterClient = getInsecureHubRpcClient(
  `${envProvider.FARCASTER_RPC_URL}:${envProvider.FARCASTER_RPC_PORT}`
);

export default farcasterClient;
