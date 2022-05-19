import { createContext, useContext, useEffect, useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from "../config/chain.info.constantine";
import { makeTxUrl } from "../utils";

export const Web3Context = createContext();

export function Web3Wrapper({ children }) {
  const [walletAddress, setWalletAddress] = useState("");
  const [key, setKey] = useState();
  const [wasmClient, setWasmClient] = useState(null);
  const [balance, setBalance] = useState(null);
  const [nftsList, setNftsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState(null);
  const [nftContractAddress, setNftContractAddress] = useState(
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
  );

  useEffect(() => {
    if (wasmClient && nftContractAddress) {
      getNfts();
      updateBalance();
    }
  }, [wasmClient, nftContractAddress]);

  useEffect(() => {
    connectClient();
  }, []);
  const chainInfo = ConstantineInfo;
  const querySmartContract = async (entrypoint) => {
    return await wasmClient.queryClient.wasm.queryContractSmart(
      nftContractAddress,
      entrypoint
    );
  };
  const updateBalance = async () => {
    if (walletAddress && wasmClient) {
      try {
        console.log("trying to update balance");
        const accountBalance = await wasmClient.getBalance(
          walletAddress,
          chainInfo.currencies[0].coinMinimalDenom
        );
        setBalance(accountBalance);
      } catch (e) {
        console.log("error trying update balance", e);
        setError(e.message);
      }
    }
  };
  const mintNft = async (extension) => {
    try {
      setLoading(true);
      const { tokens } = await getNftTokens();
      await executeTransaction({
        mint: {
          token_id: String(tokens.length),
          owner: walletAddress,
          extension,
        },
      });
    } catch (e) {
      console.warn("Error executing mint tx", e);
      setError(e.message);
    } finally {
      setSuccessMessage(null);
      setError(null);
      setLoading(false);
    }
  };

  const getTokenMeta = async (tokenId) => {
    const entrypoint = {
      nft_info: {
        token_id: tokenId,
      },
    };
    return await querySmartContract(entrypoint);
  };
  const getTokenOwner = async (tokenId) => {
    return await querySmartContract({
      owner_of: { token_id: tokenId },
    });
  };
  const getNftTokens = async () => {
    return await querySmartContract({
      all_tokens: {},
    });
  };

  const getNfts = async () => {
    const listOfNfts = [];
    try {
      setLoading(true);
      const { tokens } = await getNftTokens();
      for await (let id of tokens) {
        const { extension } = await getTokenMeta(id);
        const { owner } = await getTokenOwner(id);
        extension.owner = owner;
        extension.tokenId = id;
        listOfNfts.push(extension);
      }
      console.log({ listOfNfts });
    } catch (e) {
      console.error(`failed to load contract ${nftContractAddress}`, e);
      setError("failed to load NFT contract");
      setNftContractAddress(null);
    } finally {
      setNftsList(listOfNfts);
      setLoading(false);
    }
  };

  const disconnectKeplr = async () => {
    setKey(null);
    setWalletAddress(null);
    setWasmClient(null);
    setBalance(null);
  };

  const executeTransaction = async (entrypoint, contractAddress) => {
    try {
      setLoading(true);
      const txFee = calculateFee(300000, GasPrice.fromString("0.002uconst"));
      const tx = await wasmClient.execute(
        walletAddress,
        contractAddress ?? nftContractAddress,
        entrypoint,
        txFee
      );
      console.log("Mint Tx", tx);
      if (tx.logs) {
        if (tx.logs.length) {
          console.log("TX Logs", tx.logs);
        }
      }

      await getNfts();
      await updateBalance();
      if (tx?.transactionHash) {
        setSuccessMessage(makeTxUrl(tx.transactionHash));
      }
    } catch (e) {
      console.error("execute transaction error", e);
      setError(e.message);
    } finally {
      setSuccessMessage(null);
      setError(null);
      setLoading(false);
    }
  };

  const transferNft = async (tokenId, addressToTransfer) => {
    console.log("transfer nft");
    await executeTransaction({
      transfer_nft: {
        recipient: addressToTransfer,
        token_id: tokenId,
      },
    });
  };

  const connectClient = async () => {
    console.log("Connecting wasm client...");
    if (window?.keplr?.experimentalSuggestChain) {
      try {
        setError(null);
        setLoading(true);
        const { chainId, rpc } = chainInfo;
        const offlineSigner = await window.getOfflineSigner(chainId);
        const signingClient = await SigningCosmWasmClient.connectWithSigner(
          rpc,
          offlineSigner
        );
        const [{ address }] = await offlineSigner.getAccounts();
        if (address) {
          setWalletAddress(address);
        }
        setWasmClient(signingClient);
      } catch (e) {
        setError(e.message);
      }
    } else {
      setError("install/update keplr");
    }
  };

  const connectKeplr = async () => {
    console.log("Connecting wallet...");
    if (window?.keplr?.experimentalSuggestChain) {
      try {
        setError(null);
        const { chainId } = chainInfo;

        await window.keplr.experimentalSuggestChain(chainInfo);

        await window.keplr.enable(chainId);

        await connectClient();
      } catch (e) {
        console.error(e.message);
        setError(e.message);
      }
    } else {
      setError("install/update keplr");
    }
  };
  return (
    <Web3Context.Provider
      value={{
        walletAddress,
        disconnectKeplr,
        connectKeplr,
        querySmartContract,
        balance,
        key,
        nftsList,
        nftContractAddress,
        mintNft,
        chainInfo,
        successMessage,
        error,
        setError,
        transferNft,
        loading,
        setNftContractAddress,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3Context() {
  return useContext(Web3Context);
}
