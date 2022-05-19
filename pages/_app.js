import "../styles.css";
import Layout from "../component/layout";
import { Web3Wrapper } from "../context/web3Context";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Wrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Wrapper>
  );
}

export default MyApp;
