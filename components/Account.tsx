import MetaMaskOnboarding from "@metamask/onboarding";
import { useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'

import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import { formatEtherscanLink, shortenHex } from "../util";
import useERC20Balance from "../hooks/useERC20Balance";

const Account: React.FC = () => {
  const {
    account,
    chainId,
  } = useWeb3React();

  const ENSName = useENSName(account);
  const { data: balance } = useERC20Balance(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, account);

  return (
    <div
      className="flex flex-row items-center border border-gray-100 bg-gray-100 rounded-full"
    >
      <div className="rounded-full px-2">
        {balance} wHBAR
      </div>
      <a 
        href={formatEtherscanLink("Account", [chainId, account])}
        rel="noopener noreferrer"
        className="flex flex-row items-center bg-gray-50 px-2 rounded-full"
      >
        <div className="w-1 h-1 rounded-full bg-green-400 mr-2" />
        {ENSName || `${shortenHex(account)}`}
      </a>
    </div>
  );
};

export default Account;
