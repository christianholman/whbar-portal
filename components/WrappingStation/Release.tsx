import { useWeb3React } from "@web3-react/core";
import { release } from "process";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import useWHBARContract from "../../hooks/useWHBARContract";

type ReleaseProps = {

};

const Release: React.FC<ReleaseProps> = () => {
  const { account } = useWeb3React();
  const whbarContract = useWHBARContract("0x1dc8c0a7CAC629d286F0186e774E49ac41BEa874");

  const [whbarBalance, setWhbarBalance] = useState<string>();
  const [releaseAmount, setReleaseAmount] = useState("");
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    whbarContract.decimals().then(decimals => {
      whbarContract.balanceOf(account).then(balance => {
        setWhbarBalance((balance / 10**(decimals)).toString());
      });
    });
  });

  const handleRelease = async (amount, toAccount) => {
    whbarContract.withdraw(
      (parseInt(amount) * (10**8)).toString(),
      toAccount,
      {
        gasLimit: 5000000
      }
    );
  };

  const validAccountId = () => {
    return /(^\d+.\d+.[1-9]\d*$)/.test(accountId);
  }

  const canAfford = () => {
    return parseInt(releaseAmount) <= parseFloat(whbarBalance)
  }

  const isValid = (): boolean => {
    return (
      parseInt(releaseAmount) > 0 && 
      canAfford() && 
      validAccountId()
    )
  }


  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4">
        <div>
          <NumberFormat 
            className="release-amount-input text-2xl w-full focus:outline-none text-center p-12 font-medium"
            allowLeadingZeros={false}
            isAllowed={(values) => {
              const { formattedValue, floatValue } = values;
              return formattedValue === "" || floatValue >= 0;
            }}
            thousandSeparator={true} 
            placeholder="0 wHBAR"
            thousandsGroupStyle="thousand" 
            suffix={" wHBAR"} 
            value={releaseAmount}
            onChange={e => setReleaseAmount(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm">wHBAR Balance</span>
          <a
            className={`text-blue-500 cursor-pointer underline text-sm `}
            onClick={() => setReleaseAmount(whbarBalance)}>
              {whbarBalance} wHBAR
          </a>
        </div>
        <div className="text-gray-700 focus-within:text-blue-500 border p-4 flex flex-col w-full items-start rounded shadow transition">
          <label htmlFor="company_website" className={`block text-sm font-medium mb-1 ${!validAccountId() && accountId !== "" ? "text-red-500" : ""}`}>
            Destination 
          </label>
          <input 
            className="w-full text-gray-700 focus:outline-none" type="text" placeholder="Enter Hedera account ID" 
            onChange={e => setAccountId(e.target.value)}
          />
        </div>
        <button 
          disabled={!isValid()}
          onClick={() => handleRelease(releaseAmount, "0.0.6036")}
          className="transition text-lg px-4 py-2 font-medium text-white bg-blue-500 rounded shadow disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-default">Release
        </button>
      </div>
    </div>
  );
}

export default Release;