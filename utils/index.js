import { IPFS_PREFIX, IPFS_URI, CHAIN_EXPLORER_URL } from "../config/const";

export const makeTxUrl = (tx) => `${CHAIN_EXPLORER_URL}${tx}`;
export const cutAddress = (address) =>
  address.substring(0, 9) + "..." + address.substring(address.length - 4);
export const getTokenBalance = (balance, chainInfo) =>
  `${parseInt(balance?.amount) / 100000} ${chainInfo.currencies[0].coinDenom}`;
export const makeHttpUrl = (image) => image.replace(IPFS_PREFIX, IPFS_URI);
