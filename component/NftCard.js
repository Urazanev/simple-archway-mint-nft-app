import React from "react";
import { cutAddress, makeHttpUrl } from "../utils";
import { useWeb3Context } from "../context/web3Context";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "next/image";

export const NftCard = ({ nftMetaData }) => {
  const { name, image, owner, tokenId } = nftMetaData;
  const { walletAddress, nftContractAddress } = useWeb3Context();

  const resolveAddress = (ownerAddress) =>
    ownerAddress === walletAddress ? "You" : cutAddress(ownerAddress);
  return (
    <Grid item xs={4}>
      <Link href={`/${nftContractAddress}/${tokenId}`}>
        <div>
          <div className="card-img-container position-relative">
            <Image layout="fill" src={makeHttpUrl(image)} alt={name} objectFit="contain"/>
          </div>
          <div className=" h-100">
            <div className="card-body p-4">
              <div className="text-center">
                <h5 className="fw-bolder">{name}</h5>
              </div>
              <div className="text-center">
                <p>owner: {resolveAddress(owner)}</p>
              </div>
            </div>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center">
                <Button variant="contained">Detail</Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Grid>
  );
};
