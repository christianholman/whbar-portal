import useContract from "./useContract";
import { whbarABI } from "../util"

export default function useWHBARContract(whbarAddress, withSigner: boolean = true) {
  return useContract(whbarAddress, whbarABI, withSigner);
}
