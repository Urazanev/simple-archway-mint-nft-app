import { NftGrid } from "../component/NftGrid";
import {useWeb3Context} from "../context/web3Context";

const Home = () => {
  const { nftsList } = useWeb3Context();
  return (
    <>
      <NftGrid nftsList={nftsList}/>
    </>
  );
};

export default Home;
