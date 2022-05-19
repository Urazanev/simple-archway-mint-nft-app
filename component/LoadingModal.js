import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useWeb3Context } from "../context/web3Context";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const LoadingModal = () => {
  const { loading } = useWeb3Context();
  return (
    <Modal
      open={loading}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <div style={style}>
        <CircularProgress size="200px" />
      </div>
    </Modal>
  );
};
