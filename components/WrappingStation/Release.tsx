import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useWHBARContract from "../../hooks/useWHBARContract";

type ReleaseProps = {

};

const Release: React.FC<ReleaseProps> = () => {
  const { account } = useWeb3React();
  const whbarContract = useWHBARContract("0x1dc8c0a7CAC629d286F0186e774E49ac41BEa874");

  const [whbarBalance, setWhbarBalance] = useState<string>();
  const [releaseAmount, setReleaseAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(whbarContract)
    whbarContract.decimals().then(decimals => {
      whbarContract.balanceOf(account).then(balance => {
        setWhbarBalance((balance / 10**(decimals)).toString());
      });
    });
  });

  const toCurrency = (number) => {
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "EUR",
      currencyDisplay: "name"
    });

    return formatter.format(number).replace("euros", "wHBAR");
  }


  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4">
        <div>
          {
            !isEditing ? (
            <input
              className="release-amount-input text-2xl w-full focus:outline-none text-center p-12 font-medium" 
              type="number"
              placeholder="0 wHBAR"
              value={(releaseAmount)}
              onChange={e => setReleaseAmount(e.target.value)}
              onBlur={() => setIsEditing(!isEditing)}
            />
            ) : (
              <input
                className="release-amount-input text-2xl w-full focus:outline-none text-center p-12 font-medium" 
                type="text"
                value={toCurrency(releaseAmount)}
                onFocus={(e) => setIsEditing(!isEditing)}
                readOnly
              />
            )
          }
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm">wHBAR Balance</span>
          <a 
            className="text-blue-500 cursor-pointer underline text-sm"
            onClick={() => setReleaseAmount(whbarBalance)}>
              {whbarBalance} wHBAR
          </a>
        </div>
        <div className="text-gray-700 focus-within:text-blue-500 border p-4 flex flex-col w-full items-start rounded shadow transition">
          <label htmlFor="company_website" className="block text-sm font-medium mb-1">
            Desintation 
          </label>
          <input className="w-full text-gray-700 focus:outline-none" type="text" placeholder="Enter Hedera account ID" />
        </div>
        <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded shadow">Release</button>
      </div>
    </div>
  );
}

export default Release;