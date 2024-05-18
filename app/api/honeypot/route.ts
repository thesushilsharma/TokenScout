import { HoneypotIsV1 } from "@normalizex/honeypot-is";
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true }); // Initialize promptSync

const CHAIN_ID = 56; // Replace with the desired chain ID

async function scanToken(tokenAddress: string) {
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

const tokenToScan = prompt('Enter the token address to scan:');
scanToken(tokenToScan);
