import * as React from "react";
import { useWeb3Context } from "../context/web3Context";
import { NftGrid } from "../component/NftGrid";

const MyNfts = () => {
  const { walletAddress, nftsList } = useWeb3Context();
  const myNftList = nftsList.filter(({ owner }) => walletAddress === owner);
  return <NftGrid nftsList={myNftList} />;
};

export default MyNfts;
