import MetaMaskOnboarding from "@metamask/onboarding";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { injected } from "../connectors";
import useEagerConnect from "../hooks/useEagerConnect";

const ConnectionScreen: React.FC = () => {
  const triedToEagerConnect = useEagerConnect();

  const {
    active,
    error,
    activate,
    chainId,
    account,
    setError,
  } = useWeb3React();

  // initialize metamask onboarding
  const onboarding = useRef(null);

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
    return (
      <div>
        Error connecting.
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