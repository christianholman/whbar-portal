import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import useEagerConnect from "../hooks/useEagerConnect";
import Dashboard from "../components/Dashboard";
import ConnectionScreen from "../components/ConnectionScreen";
import Footer from "../components/Footer";

export default function Home() {
  const { account, library } = useWeb3React();

  const isConnected = typeof account === "string" && !!library;

  return (
    <>
      <Head>
        <title>wHBAR Portal</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Use the wHBAR portal to mint wHBAR on ethereum." />
        <base target="_blank"/>
        <meta name="og:title" content="wHBAR Portal" />
        <meta name="og:description" content="Use the wHBAR portal to mint wHBAR on ethereum." />
        <meta name="og:image" content="https://d1pnnwteuly8z3.cloudfront.net/images/6257c2da-dd7b-486d-a4ec-130b8125da8b/d809bb7d-238f-4879-94b4-65573c9477e3.png" />
        <meta name="og:url" content="https://portal.whbar.co" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:site_name" content="wHBAR Portal" />
        <meta name="twitter:image:alt" content="wHBAR Logo" />
      </Head>

      <main>
        {isConnected ? (
          <div className="p-4">
            <Dashboard />
          </div>
        ) : (
          <ConnectionScreen />
        )}
        <Footer />
      </main>
    </>
  );
}
