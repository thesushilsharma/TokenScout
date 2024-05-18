const { HoneypotIsV1 } =require("@normalizex/honeypot-is")

const CHAIN_ID = 56;

async function scanToken(tokenAddress) {
  try {
    const honeypotis = new HoneypotIsV1();

    const pairs = await honeypotis.getPairs(tokenAddress, CHAIN_ID);
    const scanResult = await honeypotis.honeypotScan(
      tokenAddress,
      pairs[0].Router,
      pairs[0].Pair.Address,
      CHAIN_ID
    );

    const isHoneypot = scanResult.IsHoneypot;
    const message = isHoneypot
      ? 'Warning: Potential honeypot detected!'
      : 'The token appears to be safe based on this scan.';

    console.log(message);
  } catch (error) {
    console.error('Error during scan:', error);
  }
}
const promptSync = require('prompt-sync')({ sigint: true });
const tokenToScan = promptSync('Enter the token address to scan:');
scanToken(tokenToScan);
