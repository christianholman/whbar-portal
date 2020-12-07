import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import { Contract } from "@ethersproject/contracts";
import useERC20Contract from "./useERC20Contract";

const getERC20Balance = (contract: Contract) => {
  return async (account: string): Promise<number> => {
    return contract.decimals().then(decimals => {
      return contract.balanceOf(account).then(balance => balance / (10**decimals))
    })
  }
};

export default function useERC20Balance(contractAddress, account, suspense = false) {
  const contract = useERC20Contract(contractAddress);

  const result = useSWR(
    [account],
    getERC20Balance(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)

  return result;
};