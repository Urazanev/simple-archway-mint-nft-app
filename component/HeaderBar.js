import React, { useCallback } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useRouter } from "next/router";
import { cutAddress, getTokenBalance } from "../utils";
import { useWeb3Context } from "../context/web3Context";
import Link from "next/link";
import Button from "@mui/material/Button";
import Image from "next/image";

const HeaderBar = () => {
  const router = useRouter();
  const { disconnectKeplr, connectKeplr, walletAddress, chainInfo, balance } =
    useWeb3Context();
  const disconnectWallet = useCallback(
    () => disconnectKeplr(),
    [disconnectKeplr]
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <IconButton color="inherit" onClick={() => router.push("/")}>
          <Image src="/archwayLogo.svg" height={30} width={30} />
        </IconButton>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/my-nfts">
                <a className="nav-link active" aria-current="page">
                  My NFT
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/mint-nft">
                <a className="nav-link active" aria-current="page">
                  Create NFT
                </a>
              </Link>
            </li>
          </ul>
          {walletAddress ? (
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                {balance && (
                  <li className="nav-item">
                    <span className="nav-link active">
                      {getTokenBalance(balance, chainInfo)}
                    </span>
                  </li>
                )}
                <li className="nav-item">
                  <span className="nav-link active">
                    {cutAddress(walletAddress)}
                  </span>
                </li>
                <li className="nav-item">
                  <IconButton color="inherit" onClick={disconnectWallet}>
                    <LogoutIcon color="secondary" />
                  </IconButton>
                </li>
              </ul>
            </div>
          ) : (
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Button
                    onClick={connectKeplr}
                    startIcon={<AccountBalanceWalletIcon color="secondary" />}
                    variant="contained"
                  >
                    Connect Keplr
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderBar;
