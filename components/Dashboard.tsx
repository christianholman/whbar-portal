import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import useWHBARContract from "../hooks/useWHBARContract";
import Deposits from "./Deposits";
import WHBARBalance from "./WHBARBalance";
import WrappingStation from "./WrappingStation";

const Dashboard: React.FC = () => {
  const { account } = useWeb3React();

  const whbarContract = useWHBARContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const [ hederaAccount, setHederaAccount ] = useState("");
  const [ hasLoaded, setHasLoaded ] = useState(false);

  useEffect(() => {

    whbarContract._fromAccount().then(account => {
      setHederaAccount(account);
      setHasLoaded(true);
    });
  }, [])

  return (
    hasLoaded ? (
      <section className="container mx-auto max-w-4xl space-y-4">
        <WHBARBalance />
        <WrappingStation account={account} hederaAccount={hederaAccount} />
        <Deposits account={account} hederaAccount={hederaAccount}/>
      </section>
    ) : (
      <>
        Loading...
      </>
    )
  );
};

export default Dashboard;