import { useState, useEffect } from "react";
import useSWR from "swr";
import useWHBARContract from "../hooks/useWHBARContract";

type DepositsProps = {
  account: string,
};

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Deposits: React.FC<DepositsProps> = (props) => {

  const whbarContract = useWHBARContract("0x9Ec09E93d11148F0566889FbB9a4632B6178b8af");

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
      let newDeposits = [];
      const transactions = data.transactions.filter(transaction => transaction.memo === props.account)
      for(let i = 0; i < transactions.length; i++) {
        const isConfirmed = await whbarContract.checkTxHash(transactions[i].hash)
        newDeposits.push({
          ...transactions[i],
          isConfirmed
        })
      }
      setDeposits(newDeposits)
    })()
  }, [data])

  return (
    <div>
      {!data && "Loading..."}
      {error && error}
      {data && 
        deposits.map((deposit) => (<span>{deposit.isConfirmed.toString()}</span>))
      }
    </div>
  );
};

export default Deposits;