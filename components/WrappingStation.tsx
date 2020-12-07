import { useState } from "react";
import Mint from "./WrappingStation/Mint";
import Release from "./WrappingStation/Release";

enum WrappingStationTab {
  MINT,
  RELEASE,
}

type DepositBoxProps = {

};

const WrappingStation: React.FC<DepositBoxProps> = () => {
  const [currentTab, setCurrentTab] = useState<WrappingStationTab>(WrappingStationTab.MINT);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case WrappingStationTab.MINT:
        return <Mint />
      case WrappingStationTab.RELEASE:
        return <Release />
    };
  }

  return (
    <div className="border shadow rounded max-w-lg mx-auto bg-white">
      <div className="grid grid-cols-2">
        <button 
          className={`py-4 focus:outline-none ${currentTab === WrappingStationTab.MINT ? "text-blue-500 border-r" : "text-gray-400 border-b bg-gray-50"}`}
          onClick={() => setCurrentTab(WrappingStationTab.MINT)}
          >
          Deposit
        </button>
        <button 
          className={`py-4 focus:outline-none ${currentTab === WrappingStationTab.RELEASE ? "text-blue-500 border-l" : "text-gray-400 border-b bg-gray-50"}`}
          onClick={() => setCurrentTab(WrappingStationTab.RELEASE)}
          >
          Release
        </button>
      </div>
      {
        renderCurrentTab()
      }
    </div>
  );
};

export default WrappingStation;