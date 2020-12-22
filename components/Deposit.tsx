import { useEffect, useState } from "react";
import useWHBARContract from "../hooks/useWHBARContract";
import useLocalStorage from "../hooks/useLocalStorage";
import { useWeb3React } from "@web3-react/core";

import useInterval from "react-useinterval";

type DepositProps = {
  deposit: any,
  account: string,
}

const Deposit: React.FC<DepositProps> = ({ deposit, account }) => {
  const { library } = useWeb3React();
  const whbarContract = useWHBARContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const [waitingForValidation, setWaitingForValidation] = useLocalStorage("waitingForValidation", {})
  const [isWaiting, setIsWaiting] = useState(waitingForValidation[deposit.hash]?.waiting);
  const [ethTxHash, setEthTxHash] = useState(waitingForValidation[deposit.hash]?.ethHash)
  const [isValidated, setIsValidated] = useState(true);

  const checkIfFailed = async () => {
    if(waitingForValidation[deposit.hash] && ethTxHash) {
      const receipt = await library.getTransactionReceipt(waitingForValidation[deposit.hash].ethHash)
      if (receipt && receipt.status === 0) {
        setIsWaiting(false);
      };
    }
  }

  useInterval(checkIfFailed, 1000);

  useEffect(() => {
    checkIfFailed();
  }, [])

  const handleMint = async (hash, beneficiary, amount) => {
    try {
      const cost = await whbarContract.checkCost();
      const receipt = await whbarContract.verifyDeposit(
        hash,
        beneficiary,
        amount.toString(),
        {
          gasLimit: 400000,
          value: Math.floor(cost / 10) + Number(cost),
        },
      );
      setEthTxHash(receipt.hash);
      setIsWaiting(true);
    } catch (e) {
      console.error(e)
      setIsWaiting(false);
    }
  }

  useEffect(() => {
    if (isWaiting && !isValidated) {
      const newState = {
        ...waitingForValidation,
        [deposit.hash]: {
          ethHash: ethTxHash,
          waiting: true,
          ...waitingForValidation[deposit.hash]
        },
      }
      setWaitingForValidation(newState)
    } else {
      const tempState = waitingForValidation;
      delete tempState[deposit.hash];
      setWaitingForValidation(tempState);
    }
  }, [isWaiting])

  useEffect(() => {
    (async () => {
      setIsValidated(await whbarContract.checkTxHash(deposit.hash));
    })()
  }

  );


return (
    <div className="flex flex-row justify-between shadow rounded p-4 items-center bg-white">
      <span className="font-medium">{deposit.amount / (10**8)} wHBAR</span>
      {
        !isValidated ? (
          <button 
            disabled={isWaiting}
            className={`px-4 py-2 rounded-full font-medium text-sm transition flex ${isWaiting ? "bg-purple-500 text-white disabled:cursor-default" : "bg-green-100 text-green-500 hover:bg-green-200 focus:bg-green-300 "}`}
            onClick={() => handleMint(deposit.hash, account, deposit.amount)}
          >
            {
              isWaiting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Waiting for oracle
                </>
              ) : (
                <>
                  Mint
                </>
              )
            }
          </button>
        ) : (
          <div className="p-2">
            <svg className="w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      }
    </div>
  );
}


export default Deposit;