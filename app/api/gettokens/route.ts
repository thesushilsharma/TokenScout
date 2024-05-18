import { NextResponse } from 'next/server';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const MORALIS_API_KEY = process.env.MORALIS_API_KEY || "";

// Helper to fetch token balances (re-usable)
async function getWalletTokenBalances(address: string) {
  if (!MORALIS_API_KEY) throw new Error('Moralis API key is missing');

  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    chain: EvmChain.BASE,
    address: address,
  });
  return response;
}

// GET handler 
export async function GET(req: Response) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  let address = params.get("address");

  if (!address || typeof address !== 'string') {
    return new NextResponse(JSON.stringify({ error: "Missing or invalid 'address' query parameter" }), { status: 400 });
  }

  try {
    // Initialize Moralis once per request
    await Moralis.start({ apiKey: MORALIS_API_KEY }); 

    const response = await getWalletTokenBalances(address);
    return NextResponse.json(response);
  } catch (error) {
    console.error(`Error fetching tokens:`, error); // More informative log
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 }); // Don't expose details
  } 
}
