import { useState, useEffect } from "react";
import useSWR from "swr";
import useWHBARContract from "../hooks/useWHBARContract";

type DepositsProps = {
  account: string,
};

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Deposits: React.FC<DepositsProps> = (props) => {

  const [deposits, setDeposits] = useState([]);
  const whbarContract = useWHBARContract("0x9Ec09E93d11148F0566889FbB9a4632B6178b8af");

  const { data, error } = useSWR(
    "http://api.testnet.kabuto.sh/v1/account/0.0.5814/transaction?",
    fetcher,
    { 
      refreshInterval: 1000,
      onSuccess: (data) => {
        if(data) {
          let newDeposits = [];
          const transactions = data.transactions.filter(transaction => transaction.memo === props.account)
          transactions.map(async transaction => {
            const isConfirmed = await whbarContract.checkTxHash(transaction.hash);
            const newDeposit = {
              ...transaction,
              isConfirmed,
            }
              newDeposits.push(newDeposit);
          })
          setDeposits(newDeposits);
        }
      }
    }
  );

  const renderDeposits = () => {
    const d = deposits.map(deposit => (
      <div className="p-24 bg-red-900"></div>
    ))
    console.log(d)
    return d;
  }

  return (
    <div>
      {!data && "Loading..."}
      {error && error}
      {data && 
        renderDeposits()
      }
    </div>
  );
};

export default Deposits;