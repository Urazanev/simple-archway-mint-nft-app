import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useWeb3Context } from "../context/web3Context";
import Alert from "@mui/material/Alert";
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

export const TransferNftModal = ({
  showModal,
  setShowTransferModal,
  tokenId,
}) => {
  const handleClose = () => setShowTransferModal(false);
  const { transferNft } = useWeb3Context();
  const [addressToSend, setAddressToSend] = useState(
    "archway1qp8wj38fkrmz8ajyny84asrjd7eh5qq8dwvqph"
  );
  const handleClick = async () => {
    await transferNft(tokenId, addressToSend);
    setShowTransferModal(false);
  };
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="text-center mb-5">
          <Typography variant="h6" component="h2">
            Transfer NFT
          </Typography>
        </div>
        <div className="text-center mb-5">
          <TextField
            label="Address"
            variant="outlined"
            value={addressToSend}
            onChange={(e) => setAddressToSend(e.target.value)}
          />
        </div>
        <div className="text-center mb-5">
          <Alert severity={"warning"}>
            Items sent to the wrong address cannot be recovered
          </Alert>
        </div>

        <div className="text-center mb-5">
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={!addressToSend}
            size="large"
          >
            Transfer
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
