import MetaMaskOnboarding from "@metamask/onboarding";
import { useWeb3React } from "@web3-react/core";

import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'

import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'

import { Spinner } from '../components/Spinner'

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  injected,
  network,
  walletconnect,
  walletlink
} from '../connectors'

import useEagerConnect from "../hooks/useEagerConnect";
import { CHAIN_ID_NAMES } from "../util";

enum ConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink'
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
}

const ConnectionScreen: React.FC = () => {
  const triedToEagerConnect = useEagerConnect();

  const context = useWeb3React<Web3Provider>()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  // initialize metamask onboarding
  const onboarding = useRef(null);

  const [activatingConnector, setActivatingConnector] = React.useState<any>()
    React.useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
      }
    }, [activatingConnector, connector])

  useLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);


  if (error) {
    console.log(error)
    return (
      <div className="p-12 text-center">
        <span className="mb-4">You're on the wrong network! Change to <span className="font-bold">{CHAIN_ID_NAMES[process.env.NEXT_PUBLIC_NETWORK_ID]}</span> then click to retry.</span>
        <button 
          className="transition w-full p-5 bg-blue-200 text-blue-800 font-bold rounded hover:bg-blue-300"
          onClick={() => {
            setConnecting(true);
            activate(injected, undefined, true).catch((error) => {
              // ignore the error if it's a user rejected request
              if (error instanceof UserRejectedRequestError) {
                setConnecting(false);
              } else {
                setError(error);
              }
            });
          }}>
            Connect to MetaMask
        </button>
      </div>
    );
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      window?.ethereum ||
      window?.web3;

      return (
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-sm rounded shadow bg-white">
            <div className="relative flex justify-center">
              <div className="bg-white absolute w-3 h-3 transform rotate-45 -mt-1"></div>
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Welcome to the wHBAR Portal!</div>
              <p className="text-gray-700 text-base">
                To use the portal you must connect with MetaMask.
              </p>
            </div>
            <div className="px-6 py-4">
              {hasMetaMaskOrWeb3Available ? (
                <button
                  className="transition w-full p-5 bg-blue-200 text-blue-800 font-bold rounded hover:bg-blue-300"
                  onClick={() => {
                    setConnecting(true);
                    activate(injected, undefined, true).catch((error) => {
                      // ignore the error if it's a user rejected request
                      if (error instanceof UserRejectedRequestError) {
                        setConnecting(false);
                      } else {
                        setError(error);
                      }
                    });
                  }}
                >
                  {MetaMaskOnboarding.isMetaMaskInstalled()
                    ? "Connect to MetaMask"
                    : "Connect to Wallet"}
                </button>
              ) : (
              <button 
                className="btn-thicc btn-primary"
                onClick={() => onboarding.current?.startOnboarding()}>
                  Install Metamask
                </button>
              )}
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === activatingConnector
          const connected = currentConnector === connector
          const disabled = !!activatingConnector || connected || !!error

          return (
            <button
              style={{
                marginTop: '10px',
              }}
              className="transition w-full p-5 bg-blue-200 text-blue-800 font-bold rounded hover:bg-blue-300"
              disabled={disabled}
              key={name}
              onClick={() => {
                setActivatingConnector(currentConnector)
                activate(connectorsByName[name])
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 1rem'
                }}
              >
                {activating && <Spinner color={'black'} style={{ height: '25%', marginLeft: '-1rem' }} />}
                {connected && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </button>
          )
        })}
                  </div>
                </div>
              </div>
            );
/*     return (
      <div className="flex">
        {hasMetaMaskOrWeb3Available ? (
          <button
            className="p-5 bg-blue-200 text-blue-800 font-bold rounded"
            onClick={() => {
              setConnecting(true);
              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {MetaMaskOnboarding.isMetaMaskInstalled()
              ? "Connect to MetaMask"
              : "Connect to Wallet"}
          </button>
        ) : (
        <button 
          className="btn-thicc btn-primary"
          onClick={() => onboarding.current?.startOnboarding()}>
            Install Metamask
          </button>
        )}
      </div>
    ); */
  }
}

export default ConnectionScreen;