import React from "react";
import { NftCard } from "./NftCard";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export const NftGrid = ({ nftsList }) => {
  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <Grid container spacing={6}>
            {nftsList.length > 0 &&
            nftsList.map((nftMetaData) => (
                <NftCard nftMetaData={nftMetaData} key={nftMetaData.image} />
            ))}
        </Grid>
      </div>
    </section>
  );
};
