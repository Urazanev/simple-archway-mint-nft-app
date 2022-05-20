import React, { useState } from "react";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import { useWeb3Context } from "../../context/web3Context";
import { cutAddress, makeHttpUrl } from "../../utils";
import { TransferNftModal } from "../../component/TransferNftModal";
import Button from "@mui/material/Button";
import Image from "next/image";

const NftDetail = () => {
  const router = useRouter();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const { tokenId } = router.query;
  const { nftsList, walletAddress } = useWeb3Context();
  const nft = nftsList.find(({ tokenId: nftTokenId }) => {
    return nftTokenId === tokenId;
  });

  if (!nft) return <DefaultErrorPage statusCode={404} />;
  const resolveAddress = (ownerAddress) =>
    ownerAddress === walletAddress ? "You" : cutAddress(ownerAddress);
  const { name, image, owner, description } = nft;
  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <div className="card-img-container position-relative">
              <Image layout="fill" src={makeHttpUrl(image)} alt={name} objectFit="contain"/>
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="display-5 fw-bolder">{name}</h1>
            <div className="fs-5 mb-5">
              <span>owner: {resolveAddress(owner)}</span>
            </div>
            <p className="lead">{description}</p>
            {owner === walletAddress && (
              <div className="d-flex mt-5">
                <Button
                  variant="contained"
                  onClick={() => setShowTransferModal(true)}
                >
                  Send NFT
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <TransferNftModal
        showModal={showTransferModal}
        setShowTransferModal={setShowTransferModal}
        tokenId={tokenId}
      />
    </section>
  );
};

export default NftDetail;
