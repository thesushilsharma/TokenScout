import { NextRequest, NextResponse } from 'next/server'; // Import from next/server
import { HoneypotIsV1 } from '@normalizex/honeypot-is';

const CHAIN_ID = 56; // Replace with the desired chain ID

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tokenAddress = searchParams.get('tokenAddress');

  if (!tokenAddress) {
    return NextResponse.json({ error: 'Missing tokenAddress parameter' }, { status: 400 });
  }

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

    return NextResponse.json({ isHoneypot, message });
  } catch (error) {
    console.error("Error during scan:", error);
    return NextResponse.json({ error: 'Token scan failed' }, { status: 500 });
  }
}