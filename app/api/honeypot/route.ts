const { HoneypotIsV1 } = require("@normalizex/honeypot-is");
const { promptSync } = require("prompt-sync");

let init = promptSync({ sigint: true }); // Initialize promptSync

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
      ? "Warning: Potential honeypot detected!"
      : "The token appears to be safe based on this scan.";

    console.log(message);

    return { isHoneypot, message }; // Return result object
  } catch (error) {
    console.error("Error during scan:", error);
    throw error; // Or return a more specific error object
  }
}

const tokenToScan = prompt("Enter the token address to scan:");
// Null Check and Handling:
if (tokenToScan) {
  scanToken(tokenToScan);
} else {
  console.log("No token address provided.");
}
