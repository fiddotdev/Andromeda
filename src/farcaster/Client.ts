import { getInsecureHubRpcClient } from '@farcaster/hub-nodejs';

const farcasterClient = getInsecureHubRpcClient(
  'usw1.testnet.hubble.withportals.xyz:2283'
);

export default farcasterClient;
