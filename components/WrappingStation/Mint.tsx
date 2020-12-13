import CopyableInfo from "./CopyableInfo";

type MintProps = {
  account: string
  hederaAccount: string,
};

const Mint: React.FC<MintProps> = (props) => {
  return (
    <div className="p-4">
        <div className="flex flex-col space-y-4">
          <CopyableInfo title="Account" content={props.hederaAccount} />
          <CopyableInfo title="Memo" content={props.account} />
          <div className="flex flex-row items-center p-4">
            <svg className="text-gray-400 flex-shrink-0" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span className="text-sm text-left ml-4 text-gray-600">To wrap HBAR, send to the account above using the specified memo. After sending, click mint on the incoming transaction to mint wHBAR. </span>
          </div>
        </div>
    </div>
  );
}

export default Mint;