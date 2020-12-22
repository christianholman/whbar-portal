import { useState } from "react";
import useSWR from "swr";
import Deposit from "./Deposit";

type DepositsProps = {
  account: string,
  hederaAccount: string,
};

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Deposits: React.FC<DepositsProps> = (props) => {

  const [deposits, setDeposits] = useState([]);
  const { data, error } = useSWR(
    `https://api${process.env.NEXT_PUBLIC_HEDERA_NETWORK === "testnet" ? ".testnet" : ""}.kabuto.sh/v1/account/${props.hederaAccount}/transaction?`,
    fetcher,
    { 
      refreshInterval: 1000,
      onSuccess: (data) => {
        (async () => {
          if (!!data) {
            let newDeposits = [];
            const transactions = data.transactions.filter(transaction => transaction.memo === props.account)
            for(let i = 0; i < transactions.length; i++) {
              const amount = transactions[i].transfers.find(transfer => transfer.account === props.hederaAccount).amount;
              newDeposits.push({
                ...transactions[i],
                amount,
              })
            }
            setDeposits(newDeposits)
          }
        })()
      },
      onError: (data) => {
        (async () => {
          console.log("kabuto errored again.")
        })()
      },
      errorRetryInterval: 5000,
      shouldRetryOnError: true
    },
  );

  return (
    <div className="space-y-2">
      {!data && "Loading..."}
      {error && error}
      {data && 
        deposits.map((deposit, i) => (
            <Deposit deposit={deposit} account={props.account} key={deposit.hash} />
          )
        )
      }
    </div>
  );
};

export default Deposits;
