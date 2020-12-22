import { InjectedConnector } from "@web3-react/injected-connector";

import { NetworkConnector } from '@web3-react/network-connector'

import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

// TODO: swap the urls/rpc endpoints for variable ones

const eth_net= ["mainnet", "ropsten", "kovan","rinkeby","goerli"]

export const injected = new InjectedConnector({
  supportedChainIds: [parseInt(process.env.NEXT_PUBLIC_NETWORK_ID)],
});

export const network = new NetworkConnector({
  urls: { 1: "https://mainnet.infura.io/v3/91da3a52af254c758fa6fe292fa7f9fd"},
  defaultChainId: parseInt(process.env.NEXT_PUBLIC_NETWORK_ID)
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: "https://mainnet.infura.io/v3/91da3a52af254c758fa6fe292fa7f9fd"},
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 1000
})

export const walletlink = new WalletLinkConnector({
  url: "https://mainnet.infura.io/v3/91da3a52af254c758fa6fe292fa7f9fd",
  appName: 'web3-react example'
})