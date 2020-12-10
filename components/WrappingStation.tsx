import { useState } from "react";
import Mint from "./WrappingStation/Mint";
import Release from "./WrappingStation/Release";

type WrappingStationProps = {
  account: string,
  hederaAccount: string,
}

enum WrappingStationTab {
  MINT,
  RELEASE,
}

const WrappingStation: React.FC<WrappingStationProps> = (props) => {
  const [currentTab, setCurrentTab] = useState<WrappingStationTab>(WrappingStationTab.MINT);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case WrappingStationTab.MINT:
        return <Mint account={props.account} hederaAccount={props.hederaAccount} />
      case WrappingStationTab.RELEASE:
        return <Release />
    };
  }

  return (
    <div className="border shadow rounded max-w-lg mx-auto bg-white">
      <div className="grid grid-cols-2">
        <button className={`border-b border-r border-transparent py-4 focus:outline-none ${currentTab === WrappingStationTab.MINT ? "text-blue-500" : "text-gray-400 border-gray-200 bg-gray-50"}`}
          onClick={() => setCurrentTab(WrappingStationTab.MINT)}
          >
            Wrap HBAR
        </button>
        <button 
          className={`border-b border-l border-transparent py-4 focus:outline-none ${currentTab === WrappingStationTab.RELEASE ? "text-blue-500" : "text-gray-400 border-gray-200 bg-gray-50"}`}
          onClick={() => setCurrentTab(WrappingStationTab.RELEASE)}
          >
            Unwrap wHBAR
        </button>
      </div>
      {
        renderCurrentTab()
      }
    </div>
  );
};

export default WrappingStation;