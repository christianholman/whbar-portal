import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import "../styles/global.css";
import 'react-notifications-component/dist/theme.css'

declare global {
    interface Window {
        ethereum:any;
        web3:any;
    }
}

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export default function NextWeb3App({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}
