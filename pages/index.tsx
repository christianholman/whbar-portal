import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import WHBARBalance from "../components/WHBARBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign, { hexlify } from "../hooks/usePersonalSign";
import useContract from "../hooks/useContract";
import { whbarABI } from "../util";
import Deposits from "../components/Deposits";

export default function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const sign = usePersonalSign();
  const contract = useContract(
    "0x9ec09e93d11148f0566889fbb9a4632b6178b8af", 
    whbarABI, 
    true
  );

  const handleSign = async () => {
    const msg = "Next Web3 Boilerplate Rules";
    const sig = await sign(msg);
    console.log(sig);
    console.log("isValid", verifyMessage(msg, sig) === account);
  };

  const handleContractInteract = async () => {
    // https://testnet.dragonglass.me/api/transactions?accountTo=0.0.5814&memo=0x372AF201cCf4e72C60A3ca4C6f0D5df433a32daC
    // ADD DATE! Only searches last 10k transactions on Hedera
    contract.functions.verifyDeposit(
      "a5f3666f816c50025cdd4935ae32990cb451105ea87a97e49f7fe71a8ac9d5e2a4dd0c4b96f8bec5cba1440383b0c0a1",
      "0x372AF201cCf4e72C60A3ca4C6f0D5df433a32daC", 
      "50000000",
      {
        gasLimit: 5000000
      }
    );
  }

  const isConnected = typeof account === "string" && !!library;

  return (
    <div className="p-4">
      <Head>
        <title>Next Web3 Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>wHBAR Portal</a>
          </Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        {isConnected && (
          <section>
            <WHBARBalance />
            <button onClick={handleSign}>Personal Sign</button>
            <button onClick={handleContractInteract}>Contract interact</button>
            <Deposits />
          </section>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
        }

        html {
          font-family: sans-serif, Apple Color Emoji, Segoe UI Emoji,
            Segoe UI Symbol, Noto Color Emoji;
          line-height: 1.5;
        }

        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
