import React from "react";
import { NftCard } from "./NftCard";

export const NftGrid = ({ nftsList }) => {
  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {nftsList.length > 0 &&
            nftsList.map((nftMetaData) => (
              <NftCard nftMetaData={nftMetaData} key={nftMetaData.image} />
            ))}
        </div>
      </div>
    </section>
  );
};
