import { useState, useEffect } from "react";
import useSWR from "swr";
import useWHBARContract from "../hooks/useWHBARContract";

type DepositsProps = {
  account: string,
};

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Deposits: React.FC<DepositsProps> = (props) => {

  const whbarContract = useWHBARContract("0x1dc8c0a7CAC629d286F0186e774E49ac41BEa874");

  const [deposits, setDeposits] = useState([]);
  const { data, error } = useSWR(
    "http://api.testnet.kabuto.sh/v1/account/0.0.5814/transaction?",
    fetcher,
    { 
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    (async () => {
      if (!!data) {
        let newDeposits = [];
        const transactions = data.transactions.filter(transaction => transaction.memo === props.account)
        for(let i = 0; i < transactions.length; i++) {
          const amount = transactions[i].transfers.find(transfer => transfer.account === "0.0.5814").amount;
          let isValidated = false;
          try {
            await whbarContract.estimateGas.verifyDeposit(transactions[i].hash, props.account, amount.toString());
          } catch (e) {
            isValidated = true;
          }
          newDeposits.push({
            ...transactions[i],
            amount,
            isValidated,
          })
        }
        setDeposits(newDeposits)
      }
    })()
  }, [data])

  const handleMint = async (hash, beneficiary, amount) => {
    // https://testnet.dragonglass.me/api/transactions?accountTo=0.0.5814&memo=0x372AF201cCf4e72C60A3ca4C6f0D5df433a32daC
    // ADD DATE! Only searches last 10k transactions on Hedera
    whbarContract.verifyDeposit(
      hash,
      beneficiary,
      amount.toString(),
      {
        gasLimit: 5000000
      }
    );
  }

  return (
    <div className="space-y-2">
      {!data && "Loading..."}
      {error && error}
      {data && 
        deposits.map((deposit) => (
          <div className="flex flex-row justify-between shadow rounded p-4 items-center bg-white">
            <span className="font-medium">{deposit.amount / (10**8)} wHBAR</span>
            {
              !deposit.isValidated ? (
                <button 
                  className="px-4 py-2 bg-green-100 text-green-500 rounded-full font-medium text-sm transition hover:bg-green-200 focus:bg-green-300"
                  onClick={() => handleMint(deposit.hash, props.account, deposit.amount)}
                >Mint</button>
              ) : (
                null
              )
            }
          </div>)
        )
      }
    </div>
  );
};

export default Deposits;