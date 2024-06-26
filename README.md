# TokenScout

An application that analyzes ERC20 tokens on a Base chain (or any EVM chain with adjustments). It provides insights into potential honeypots, checks for ERC20 compliance, and estimates buy and sell taxes (if the contract exposes this information on-chain).

## Features

- Estimates buy and sell tax for ERC20 tokens (Base Chain)
- Basic honeypot detection (Spam token)
- **[Moralis Integration](https://moralis.io/):** Utilizes the Moralis API for comprehensive blockchain data.
  - Get ERC20 token metadata by contract
  - Get ERC20 token metadata by symbols
  - Get ERC20 token balance by wallet
  - Get ERC20 Token Balances with Prices by Wallet

## Pre-requisites

- VS Code or any Code Editor
- Node.js installed on your machine
- npm package manager
- RPC URL

## Technology Stack

- Web3.js
- Nextjs
- Typescript
- Tailwind CSS

## Getting Started

- Clone this repository to your local machine.
- Install dependencies using npm.

    ```js
    npm install
    ```

- Run the script:

    ```js
    nodemon index.ts
    ```

## Configuration

Add your Moralis API key

## Usage

- ### Example
  
  - Enter Wallet Address: Input the Ethereum wallet address you want to analyze.
  - Click "Submit": Token Scout will fetch and analyze the tokens in the wallet.
  - View Results: See a list of tokens with clear indicators of potential spam (SPAM 👎 or NO SPAM 👍).

- ### Response
  
  - A request is made to the ```/api/gettokens?address=``` endpoint with the wallet address.
  - The API route ```/api/honeypot?tokenAddress=``` expects a token address

## Deployment

You can deploy this repo to a production server using a platform like Vercel, Netlify, Heroku or any of your choice.

## Future Enhancements

- **Honeypot Detection:** Implement advanced algorithms to identify honeypot tokens that trap investors' funds.
- **Rug Pull Risk Assessment:** Evaluate the risk of a project being a rug pull based on factors like liquidity, ownership, and contract analysis.
- **Token Contract Analysis:** Integrate tools to scan token contracts for potential vulnerabilities or malicious code.

## Contributing

You can fix the repository and submit pull requests with improvements or bug fixes. We welcome contributions from the community!

## License

This project is licensed under the [MIT License](LICENSE).
