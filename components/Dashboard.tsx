import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import useWHBARContract from "../hooks/useWHBARContract";
import Deposits from "./Deposits";
import IntroductionModal from "./IntroductionModal";
import WHBARBalance from "./WHBARBalance";
import WrappingStation from "./WrappingStation";
import Modal from "react-modal";
import Account from "./Account";
import Link from "next/link";
import ReactNotification from 'react-notifications-component'

const Dashboard: React.FC = () => {
  const { account } = useWeb3React();

  const whbarContract = useWHBARContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const [ hederaAccount, setHederaAccount ] = useState("");
  const [ hasLoaded, setHasLoaded ] = useState(false);
  const [ introductionModalShowing, setIntroductionModalShowing ] = useState(true);


  useEffect(() => {
    console.log(whbarContract)
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
        <ReactNotification />
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
          <header>
            <nav className="flex flex-row justify-center md:justify-between mb-4">
              <div>
                <Link href="/">
                  <a className="flex flex-row items-center">
                    wHBAR Portal
                    <div className="inline px-2 py-1 block bg-blue-200 text-xs text-blue-800 uppercase font-medium rounded-full ml-1">
                      Beta
                    </div>
                  </a>
                </Link>
              </div>
              <div className="hidden md:block">
                <Account />
              </div>
            </nav>
          </header>
        <section className="flex flex-col container mx-auto max-w-4xl space-y-4">
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