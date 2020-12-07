import { useWeb3React } from "@web3-react/core";
import useERC20Balance from "../hooks/useERC20Balance";

const WHBARBalance = () => {
  const { account } = useWeb3React();
  const { data } = useERC20Balance(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, account);

  return <p>Balance: <span className="font-bold">{data + " wHBAR"}</span></p>;
};

export default WHBARBalance;
