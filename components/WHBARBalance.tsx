import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useWHBARContract from "../hooks/useWHBARContract";

const WHBARBalance = () => {
  const { account } = useWeb3React();
  const whbarContract = useWHBARContract("0x9Ec09E93d11148F0566889FbB9a4632B6178b8af");

  const [whbarBalance, setWhbarBalance] = useState<string>();

  useEffect(() => {
    whbarContract.decimals().then(decimals => {
      whbarContract.balanceOf(account).then(balance => {
        setWhbarBalance((balance / 10**(decimals)).toString());
      });
    });
  });

  return <p>WHBAR Balance: Ξ{whbarBalance ? whbarBalance.toString() : "Loading"}</p>;
};

export default WHBARBalance;
