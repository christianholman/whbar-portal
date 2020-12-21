# 🌀 wHBAR Portal

## Local development

1. Install dependencies
2. Configure environment
3. Run

### Install dependencies
```bash
npm i
# or 
yarn
```
### Configure environment
Next.js loads a local environment file from `.env.local`
```bash 
mv .env.sample .env.local
```

Fill in the appropriate values
```bash
# The wHBAR contract address
NEXT_PUBLIC_CONTRACT_ADDRESS=0x6b432bb2dc5f6202ef79220df986c40656710954

# Ethereum network that the contract is on (1 = Ethereum, 5 = Goerli, etc..)
# https://chainid.network/
NEXT_PUBLIC_NETWORK_ID=5

# Hedera mainnet or testnet
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```
### Run
Run the development server
```bash
npm run dev
# or
yarn dev
```