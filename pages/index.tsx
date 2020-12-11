import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";
import Dashboard from "../components/Dashboard";
import ConnectionScreen from "../components/ConnectionScreen";

export default function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>wHBAR Portal</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Use the wHBAR portal to mint wHBAR on ethereum." />
      </Head>

      <main>
        {isConnected ? (
          <div className="p-4">
            <Dashboard />
          </div>
        ) : (
          <ConnectionScreen />
        )}
      </main>
    </div>
  );
}
