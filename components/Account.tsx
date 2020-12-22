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

const Account = () => {
  const {
    active,
    error,
    activate,
    chainId,
    account,
    setError,
  } = useWeb3React();
  const ENSName = useENSName(account);

  return (
    <a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        rel: "noopener noreferrer",
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
  );
};

export default Account;
