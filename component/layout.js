import React from "react";
import HeaderBar from "./HeaderBar";
import { ErrorAlertDialog, SuccessAlertDialog } from "./AlertDialog";
import { LoadingModal } from "./LoadingModal";
import { SetNewNftContractAddress } from "./SetNewNftContractAddress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Layout({ children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#f05a27",
      },
      secondary: {
        main: "#01635f",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <main>{children}</main>
      <ErrorAlertDialog />
      <SuccessAlertDialog />
      <LoadingModal />
      <SetNewNftContractAddress />
    </ThemeProvider>
  );
}
