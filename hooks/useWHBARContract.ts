import useContract from "./useContract";
import { whbarABI } from "../util"

export default function useWHBARContract(whbarAddress) {
  return useContract(whbarAddress, whbarABI);
}
