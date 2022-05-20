import React, {useEffect, useState} from "react";
import {useWeb3Context} from "../context/web3Context";
import Alert from '@mui/material/Alert';

export const SuccessAlertDialog = () => {
  const [message, setMessage] = useState(null);
  const {successMessage} = useWeb3Context();
  useEffect(() => {
    if (successMessage) {
      setMessage(successMessage);
      setTimeout(() => setMessage(null), 3000);
    }

  }, [successMessage, setMessage]);
  return message ? (<Alert severity="success" className="success-alert-dialog">{message}</Alert>) : (<></>);
}

export const ErrorAlertDialog = () => {
  const [message, setMessage] = useState(null);
  const {error} = useWeb3Context();
  useEffect(() => {
    if (error) {
      setMessage(error);
      setTimeout(() => setMessage(null), 3000);
    }

  }, [error, setMessage]);
  return message ? (<Alert severity="error" className="error-alert-dialog">{message}</Alert>) : (<></>);
}
