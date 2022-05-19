import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useWeb3Context } from "../context/web3Context";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SetNewNftContractAddress = () => {
  const { setNftContractAddress, nftContractAddress } = useWeb3Context();
  const [contractAddress, setContractAddress] = useState("");
  const handleClick = async () => {
    setNftContractAddress(contractAddress);
  };
  return (
    <Modal
      open={!nftContractAddress}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="text-center mb-5">
          <Typography variant="h6">Failed to load NFT contract</Typography>
          <Typography variant="subtitle1">
            Please submit new Archway NFT contract
          </Typography>
        </div>
        <div className="text-center mb-5">
          <TextField
            label="Address"
            variant="outlined"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </div>
        <div className="text-center mb-5">
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={!contractAddress}
            size="large"
          >
            Set new NFT contract address
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
