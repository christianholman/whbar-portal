import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useWHBARContract from "../hooks/useWHBARContract";

const WHBARBalance = () => {
  const { account } = useWeb3React();
  const whbarContract = useWHBARContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const [whbarBalance, setWhbarBalance] = useState<string>();

  useEffect(() => {
    whbarContract.decimals().then(decimals => {
      whbarContract.balanceOf(account).then(balance => {
        setWhbarBalance((balance / 10**(decimals)).toString());
      });
    });
  });

  return <p>wHBAR Balance: Ξ{whbarBalance ? whbarBalance.toString() : "Loading"}</p>;
};

export default WHBARBalance;
