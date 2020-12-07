import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useWHBARContract from "../hooks/useWHBARContract";

const WHBARBalance = () => {
  const { account } = useWeb3React();
  const whbarContract = useWHBARContract("0x1dc8c0a7CAC629d286F0186e774E49ac41BEa874");

  const [whbarBalance, setWhbarBalance] = useState<string>();

  useEffect(() => {
    console.log(whbarContract)
    whbarContract.decimals().then(decimals => {
      whbarContract.balanceOf(account).then(balance => {
        setWhbarBalance((balance / 10**(decimals)).toString());
      });
    });
  });

  return <p>wHBAR Balance: Ξ{whbarBalance ? whbarBalance.toString() : "Loading"}</p>;
};

export default WHBARBalance;
