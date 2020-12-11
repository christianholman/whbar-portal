import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import useWHBARContract from "../hooks/useWHBARContract";
import Deposits from "./Deposits";
import IntroductionModal from "./IntroductionModal";
import WHBARBalance from "./WHBARBalance";
import WrappingStation from "./WrappingStation";
import Modal from "react-modal";

const Dashboard: React.FC = () => {
  const { account } = useWeb3React();

  const whbarContract = useWHBARContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const [ hederaAccount, setHederaAccount ] = useState("");
  const [ hasLoaded, setHasLoaded ] = useState(false);
  const [ introductionModalShowing, setIntroductionModalShowing ] = useState(true);

  useEffect(() => {
    whbarContract._fromAccount().then(account => {
      setHederaAccount(account);
      setHasLoaded(true);
    });
  }, [])

  const closeIntroductionModal = () => {
    setIntroductionModalShowing(false);
  }

  return (
    hasLoaded ? (
      <>
        <Modal
          isOpen={introductionModalShowing}
          onRequestClose={closeIntroductionModal}
          style={{
            content: {
              backgroundColor: "rgba(0,0,0,0)",
              border: 0,
            }
          }}
        >
          <IntroductionModal onClose={closeIntroductionModal}/>
        </Modal>
        <section className="container mx-auto max-w-4xl space-y-4">
          <WHBARBalance />
          <WrappingStation account={account} hederaAccount={hederaAccount} />
          <Deposits account={account} hederaAccount={hederaAccount}/>
        </section>
      </>
    ) : (
      <>
        Loading...
      </>
    )
  );
};

export default Dashboard;