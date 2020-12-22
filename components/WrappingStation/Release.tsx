import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import useERC20Balance from "../../hooks/useERC20Balance";
import useTransactionReceipt from "../../hooks/useTransactionReceipt";
import useWHBARContract from "../../hooks/useWHBARContract";
import { store } from "react-notifications-component";

import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'

import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'


type ReleaseProps = {

};

const Release: React.FC<ReleaseProps> = () => {
  const { account } = useWeb3React();

  const whbarContract = useWHBARContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const { data: whbarBalance } = useERC20Balance(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, account)
  const [releaseAmount, setReleaseAmount] = useState("");
  const [actualReleaseAmount, setActualReleaseAmount] = useState(0)
  const [accountId, setAccountId] = useState("");

  const [isReleasing, setIsReleasing] = useState(false);
  const [receipt, setReceipt] = useTransactionReceipt(null);

  useEffect(() => {
    if (isReleasing && receipt ) {
      setIsReleasing(false);
      if (receipt.status == 0) {
        // Failed
        store.addNotification({
          title: "Transaction failed!",
          message: "The release transaction reverted.",
          type: "danger",
          insert: "bottom",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      } else {
        // Confirmed
        store.addNotification({
          title: "HBAR Unwrapped!",
          message: "Your wHBAR has been submitted for release and will shortly arrive in your account (can take up to a few hours)",
          type: "success",
          insert: "bottom",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }
    }
  }, [receipt])

  const handleRelease = async (amount, toAccount) => {
    const cost = await whbarContract.checkCost();
    try{
      const receipt = await whbarContract.withdraw(
        (parseInt(amount) * (10**8)).toString(),
        toAccount,
        {
          gasLimit: 400000,
          value: Math.floor(cost / 10) + Number(cost),
        }
      );

      setReceipt(receipt.hash);
      setIsReleasing(true);
    } catch(error){
      console.log(error);
    }

  };

  const validAccountId = () => {
    return /(^\d+\.\d+\.[1-9]\d*$)/.test(accountId);
  }

  const canAfford = (): boolean => {
    return actualReleaseAmount <= whbarBalance
  }

  const isValid = (): boolean => {
    return (
      canAfford() && 
      validAccountId() &&
      actualReleaseAmount >= (10**-8)
    )
  }


  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4">
        <div className="py-12">
          <span className="text-sm text-gray-400 select-none">
            I want to unwrap
          </span>
          <NumberFormat 
            autoFocus
            className="release-amount-input text-2xl w-full focus:outline-none text-center py-4 font-medium"
            allowLeadingZeros={false}
            onValueChange={values => {
              const { floatValue } = values;
              setActualReleaseAmount(floatValue);
            }}
            isAllowed={(values) => {
              const { formattedValue, floatValue } = values;
              return formattedValue === "" || floatValue >= 0;
            }}
            decimalScale={8}
            thousandSeparator={true} 
            placeholder="0 wHBAR"
            thousandsGroupStyle="thousand" 
            suffix={" wHBAR"} 
            value={releaseAmount}
            onChange={e => setReleaseAmount(e.target.value)}
          />
          <span className="text-sm text-gray-400 select-none">
            and receive HBAR
          </span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm">wHBAR Balance</span>
          <a
            className={`text-blue-500 cursor-pointer underline text-sm `}
            onClick={() => setReleaseAmount(whbarBalance.toString())}>
              {whbarBalance} wHBAR
          </a>
        </div>
        <div className="text-gray-700 focus-within:text-blue-500 border p-4 flex flex-col w-full items-start rounded shadow transition">
          <label htmlFor="company_website" className={`block text-sm font-medium mb-1 ${!validAccountId() && accountId !== "" ? "text-red-500" : ""}`}>
            Destination 
          </label>
          <input 
            className="w-full text-gray-700 focus:outline-none" type="text" placeholder="Enter Hedera account ID" 
            onChange={e => setAccountId(e.target.value)}
          />
        </div>
        <button 
          disabled={!isValid() || isReleasing}
          onClick={() => handleRelease(releaseAmount, accountId)}
          className={`flex flex-row justify-center items-center transition text-lg px-5 py-2 font-medium text-white rounded shadow ${!isReleasing ? "bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none" : "bg-blue-200"} disabled:cursor-default`}>
            {
              isReleasing ? (
                <>
                  <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </>
              ) : (
                <>
                  Release
                </>
              )
            }
        </button>
      </div>
    </div>
  );
}

export default Release;