import { useState, useEffect } from "react";
import useSWR from "swr";
import useWHBARContract from "../hooks/useWHBARContract";

type DepositsProps = {
  account: string,
};

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Deposits () {

  const [deposits, setDeposits] = useState(null);
  const whbarContract = useWHBARContract("0x9Ec09E93d11148F0566889FbB9a4632B6178b8af");

  const { data, error } = useSWR(
    "https://cors-anywhere.herokuapp.com/https://testnet.dragonglass.me/api/transactions?accountTo=0.0.5814&memo=0x372AF201cCf4e72C60A3ca4C6f0D5df433a32daC&consensusStartInEpoch=1536710400", 
    fetcher,
    { 
      refreshInterval: 1000 
    }
  );

  useEffect(() => {
    if (data) {
      let newDeposits = [];
      data.data.map(transaction => {
        whbarContract.checkTxHash(transaction.transactionHash).then(isConfirmed => {
          newDeposits.push({
            ...transaction,
            isConfirmed,
          });
        });
      });
      setDeposits(newDeposits);
    }
    console.log(deposits)
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  return deposits ? (
    <div>
    {
      deposits.map(deposit => (
        <div>
          {JSON.stringify(deposit)}
        </div>
      ))
    }
    </div>
  ) : (
    <span>No deposits</span>
  );
};