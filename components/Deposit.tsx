import { useEffect, useState } from "react";
import useWHBARContract from "../hooks/useWHBARContract";

type DepositProps = {
  deposit: any,
  account: string,
}

const Deposit: React.FC<DepositProps> = ({ deposit, account }) => {
  const whbarContract = useWHBARContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const [isWaiting, setIsWaiting] = useState(false);

  const handleMint = async (hash, beneficiary, amount) => {
    try {
      await whbarContract.verifyDeposit(
        hash,
        beneficiary,
        amount.toString(),
        {
          gasLimit: 5000000
        }
      ); 
    } catch (e) {
      setIsWaiting(false)
    }
    setIsWaiting(true);
  }

  return (
      <div className="flex flex-row justify-between shadow rounded p-4 items-center bg-white">
        <span className="font-medium">{deposit.amount / (10**8)} wHBAR</span>
        {
          !deposit.isValidated ? (
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )
        }
      </div>
  );
}


export default Deposit;