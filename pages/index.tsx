import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div className="p-4">
      <Head>
        <title>wHBAR Portal</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Use the wHBAR portal to mint wHBAR on ethereum." />
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
          <Dashboard />
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
