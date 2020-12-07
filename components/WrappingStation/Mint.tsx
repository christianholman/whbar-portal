import QRCode from "react-qr-code";

type MintProps = {

};

const Mint: React.FC<MintProps> = () => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex self-center justify-center pb-8">
        <QRCode 
          value="hedera:0.0.5814?m=0x372AF201cCf4e72C60A3ca4C6f0D5df433a32daC"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="border p-4 flex flex-col w-full items-start rounded shadow">
          <label htmlFor="company_website" className="block text-sm font-medium text-gray-700 mb-1">
            Account
          </label>
          <div className="rounded w-full flex justify-between">
            <span className="text-sm text-gray-400">{`0.0.5184`}</span>
          </div>
        </div>
        <div className="border p-4 flex flex-col w-full items-start rounded shadow">
          <label htmlFor="company_website" className="block text-sm font-medium text-gray-700 mb-1">
            Memo
          </label>
          <div className="rounded w-full flex justify-between">
            <span className="text-sm text-gray-400">{`0x372AF201cCf4e72C60A3ca4C6f0D5df433a32daC`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mint;