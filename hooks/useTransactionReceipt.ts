import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

const getTransactionReceipt = (library) => {
  return async (hash) => {
    return library.getTransactionReceipt(hash);
  }
}

const useTransactionReceipt = (hash, suspense = false) => {
  const { library } = useWeb3React();

  const result = useSWR(
    !!library ? [hash, "useTransactionReceipt"] : null,
    getTransactionReceipt(library),
    {
      suspense,
    }
  );


  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result.data;
}

export default useTransactionReceipt;