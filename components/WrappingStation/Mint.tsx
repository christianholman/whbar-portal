import { useWeb3React } from "@web3-react/core";
import QRCode from "react-qr-code";

type MintProps = {

};

const Mint: React.FC<MintProps> = () => {

  const hederaAccount = process.env.NEXT_PUBLIC_HEDERA_ACCOUNT;
  const { account } = useWeb3React();

  return (
    <div className="flex flex-col p-4">
      <div className="flex self-center justify-center pb-8">
        <QRCode 
          value={`hedera:${hederaAccount}?m=${account}`}
        />
        </div>
      <div className="flex flex-col space-y-4">
        <div className="border p-4 flex flex-col w-full items-start rounded">
          <label htmlFor="company_website" className="block text-sm font-medium text-gray-700 mb-1">
            Account
          </label>
          <div className="rounded w-full flex justify-between">
            <span className="text-sm text-gray-400">{hederaAccount}</span>
          </div>
        </div>
        <div className="border p-4 flex flex-col w-full items-start rounded">
          <label htmlFor="company_website" className="block text-sm font-medium text-gray-700 mb-1">
            Memo
          </label>
          <div className="rounded w-full flex justify-between">
            <span className="text-sm text-gray-400">{account}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mint;