import { useWeb3React } from "@web3-react/core";
import useERC20Balance from "../hooks/useERC20Balance";
import { formatEtherscanLink, shortenHex } from "../util";
import useENSName from "../hooks/useENSName";

const Account: React.FC = () => {
  const {
    account,
    chainId,
  } = useWeb3React();

  const ENSName = useENSName(account);
  const { data: balance } = useERC20Balance(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, account);

  return (
    <div
      className="flex flex-row items-center border border-gray-100 bg-gray-100 rounded-full"
    >
      <div className="rounded-full px-2">
        {balance} wHBAR
      </div>
      <a 
        href={formatEtherscanLink("Account", [chainId, account])}
        rel="noopener noreferrer"
        className="flex flex-row items-center bg-gray-50 px-2 rounded-full"
      >
        <div className="w-1 h-1 rounded-full bg-green-400 mr-2" />
        {ENSName || `${shortenHex(account)}`}
      </a>
    </div>
  );
};

export default Account;