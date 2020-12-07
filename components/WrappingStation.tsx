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
          className={`${currentTab === WrappingStationTab.MINT ? "text-blue-500 border-" : "text-gray-300"} py-4 transition`}
          onClick={() => setCurrentTab(WrappingStationTab.MINT)}
          >
          Deposit
        </button>
        <button 
          className={`${currentTab === WrappingStationTab.RELEASE ? "text-blue-500" : "text-gray-300"} py-4 transition`}
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