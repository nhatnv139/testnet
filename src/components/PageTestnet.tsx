"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

import useApprovalToken from "@/hooks/useApproveToken";
import useDeposit from "@/hooks/useDeposit";
import useTokenBalance from "@/hooks/useTokenBalance";
import styles from "../styles/PageTestnet.module.css";
import { parseUnits, zeroAddress } from "viem";
import { useAccount, useSwitchChain } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import BigNumber from "bignumber.js";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { targetChainId } from "@/config";
import { formatNumber } from "@/utils";
import { isValidEmail } from "@/helper";
import ModalConnectWebApp from "./ModalConnectWebApp";
import { useSearchParams } from "next/navigation";
import useGetToken from "@/hooks/useGetToken";
import Image from "next/image";
import process1 from "../../public/images/testnet/img_process_testnet.png";
import process2 from "../../public/images/testnet/img_process_parthenon.png";
import process3 from "../../public/images/testnet/img_process_mainnet.png";
import wallet from "../../public/images/testnet/wallet.svg";
import Information from "./Testnet/Information";
import Faucet from "./Testnet/Faucet";
import celestia from "../../public/images/icon_celestia.svg";
import eth from "../../public/images/icon_eth.svg";
import logo from "../../public/images/logopc.svg";
import Link from "next/link";
import logoIcon from "../../public/images/logo.png";

const depsositContractAddress =
  process.env.NEXT_PUBLIC_DEPOSIT_CONTRACT_ADDRESS || "";
const defaultChainId = process.env.NEXT_PUBLIC_CHAIN_ID || "";

export default function PageTestnet() {
  const { t } = useTranslation("common");
  const dataProcess = [
    {
      id: 1,
      name: t("process1"),
      img: process1,
    },
    {
      id: 2,
      name: t("process2"),
      img: process2,
    },
    {
      id: 3,
      name: t("process3"),
      img: process3,
    },
  ];
  const dataTestnet = [
    {
      id: 1,
      label: t("name_environment"),
      name: "TESTNET",
      //   img: process1,
    },
    {
      id: 2,
      label: t("name_chainId"),
      name: "281123",
    },
    {
      id: 3,
      label: t("da_layer"),
      name: "Celestia",
      img: celestia,
    },
    {
      id: 4,
      label: t("Settlement"),
      name: "ETH",
      img: eth,
    },
  ];

  const searchParams = useSearchParams();
  const { address, isConnected, isConnecting, chainId } = useAccount();
  const { data: tokens } = useGetToken(chainId ?? +defaultChainId);
  const { switchChain, isSuccess: swithSuccess } = useSwitchChain();
  const { open } = useWeb3Modal();

  const [email, setEmail] = useState("");
  const [loadingMain, setLoadingMain] = useState(false);
  const [amount, setAmount] = useState<any>("");
  const [token, setToken] = useState<any>("");
  const [openModalConnect, setModalOpenConnect] = useState(false);
  const {
    allowance,
    isSuccess: approveSuccess,
    approve,
    error: approveError,
    isError: isApproveError,
  } = useApprovalToken(token, depsositContractAddress);
  const { balance, balanceFormated, refetchBalance, decimals } =
    useTokenBalance(token);
  const {
    deposit,
    isSuccess: depositSuccess,
    error,
    isError,
  } = useDeposit(depsositContractAddress);

  //   useEffect(() => {
  //     if (tokens && tokens.length) {
  //       setToken(tokens[0]?.address);
  //     }
  //   }, [tokens]);

  //   useEffect(() => {
  //     if (depositSuccess) {
  //       refetchBalance();
  //       setLoadingMain(false);
  //       setAmount("");
  //       setEmail("");
  //       toast.success(t("deposit_success"));
  //     }
  //   }, [depositSuccess]);

  //   useEffect(() => {
  //     if (approveSuccess) {
  //       toast.success(t("approve_success"));
  //       setLoadingMain(false);
  //     }
  //   }, [approveSuccess]);

  //   useEffect(() => {
  //     if (swithSuccess) {
  //       setLoadingMain(false);
  //     }
  //   }, [swithSuccess]);

  //   useEffect(() => {
  //     if (searchParams && searchParams.get("email")) {
  //       setEmail(searchParams.get("email")?.trim() ?? "");
  //     }
  //   }, [searchParams]);

  //   useEffect(() => {
  //     if (isError && error?.message) {
  //       if (error?.message.includes("User rejected the request.")) {
  //         toast.error(t("declines_transaction"));
  //       } else toast.error(error?.message);
  //       setLoadingMain(false);
  //     }
  //   }, [isError, error]);

  //   useEffect(() => {
  //     if (isApproveError && approveError?.message) {
  //       if (approveError?.message.includes("User rejected the request.")) {
  //         toast.error(t("declines_transaction"));
  //       } else toast.error(approveError?.message);
  //       setLoadingMain(false);
  //     }
  //   }, [isApproveError]);

  //   const renderButton = () => {
  //     const isWrongNetwork = chainId !== targetChainId;
  //     if (!isConnected)
  //       return (
  //         <button
  //           className="btn_deposit"
  //           onClick={() => {
  //             if (!(window as any)?.ethereum) return setModalOpenConnect(true);
  //             open();
  //           }}
  //         >
  //           {t("connectWallet")}
  //         </button>
  //       );
  //     // check network
  //     if (isWrongNetwork)
  //       return (
  //         <button
  //           className="btn_deposit"
  //           onClick={() => {
  //             setLoadingMain(true);
  //             switchChain({ chainId: targetChainId });
  //           }}
  //         >
  //           {t("switch_network")}
  //         </button>
  //       );

  //     if (isConnecting || loadingMain)
  //       return (
  //         <button disabled className="btn_deposit">
  //           <CircularProgress
  //             color="inherit"
  //             style={{ width: "15px", height: "15px", marginRight: "5px" }}
  //           />
  //           {t("loading")}...
  //         </button>
  //       );

  //     // check balance
  //     if (new BigNumber(balanceFormated).lt(amount ?? "0"))
  //       return (
  //         <button disabled className="btn_deposit">
  //           {t("insufficient_balance")}
  //         </button>
  //       );

  //     // check approve if type token
  //     if (
  //       token !== zeroAddress &&
  //       (new BigNumber(allowance.toString()).lt(
  //         parseUnits(amount ?? "0", decimals).toString()
  //       ) ||
  //         allowance === BigInt(0))
  //     ) {
  //       return (
  //         <button
  //           disabled={+amount <= 0 || email === ""}
  //           className="btn_deposit"
  //           onClick={() => {
  //             setLoadingMain(true);
  //             approve(amount, decimals);
  //           }}
  //         >
  //           {t("approve_token")}
  //         </button>
  //       );
  //     }

  //     return (
  //       <button
  //         className="btn_deposit"
  //         disabled={+amount <= 0 || email === ""}
  //         onClick={() => {
  //           if (!isValidEmail(email.trim()))
  //             return toast.error(t("email_invalid"));
  //           setLoadingMain(true);
  //           deposit({ tokenAddress: token, decimals, amount, account: email });
  //         }}
  //       >
  //         {t("deposit")}
  //       </button>
  //     );
  //   };

  return (
    <div>
      <div className={styles.processMain}>
        {dataProcess.map((item: any, index: number) => (
          <span key={index} className={styles.processItem}>
            <div>
              <Image
                className={styles.processImg}
                src={item.img}
                alt={item.name}
                loading="lazy"
                width={276}
              />
              <div
                className={`${styles.processName} ${
                  index == 0 ? styles.processActive : ""
                }`}
              >
                {item.name}
              </div>
            </div>
          </span>
        ))}
      </div>
      <div className={styles.testnetContent}>
        <div
          className={`${styles.testnetContentLeft} ${styles.bgTestnetContent}`}
        >
          <div className={styles.testnetWallet}>
            <div className={styles.testnetWalletHeader}>
              <div className={styles.logo}>
                <Link href="/">
                  <Image
                    className={styles.logoIconPre}
                    src={logoIcon}
                    alt="picture"
                    layout="fixed"
                    loading="lazy"
                    width={40}
                  />
                  <Image
                    src={logo}
                    height={17}
                    alt="picture"
                    layout="fixed"
                    loading="lazy"
                  />
                </Link>
              </div>
              <button className={styles.btnAddWallet}>
                <div className={styles.btnText}> {t("btn_wallet_testnet")}</div>
                <Image
                  className={styles.processImg}
                  src={wallet}
                  alt={wallet}
                  loading="lazy"
                />
              </button>
            </div>
            <div className={styles.testnetWalletContent}>
              {dataTestnet.map((item: any, index: number) => (
                <div key={index} className={styles.walletItem}>
                  <div className={styles.walletItemLable}>{item.label}</div>
                  <div className={styles.walletName}>
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt="picture"
                        layout="fixed"
                        loading="lazy"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <></>
                    )}

                    <div className={styles.walletItemName}>{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Information />
        </div>
        <div
          className={`${styles.testnetContentRight} ${styles.bgTestnetContent}`}
        >
          <Faucet />
        </div>
      </div>
      {/* <div className={styles.homeContentTitle}>{t("deposit_title")}</div>
      <div className={styles.homeContentSub}>{t("deposit_sub_title")}.</div> */}
      {/* <div className="form-content">
        <div className="form-module">
          <div className="form-group account">
            <p className="label">{t("deposit_form_account")}</p>
            <input
              type="text"
              placeholder={t("deposit_form_account_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <p className="note">{t("deposit_form_confirm_account")}</p>
          </div>
          <div className="form-group total-wallet ">
            <div className="group-head">
              <p className="label">{t("deposit_form_asset")}</p>
              <div className="">
                <Select
                  value={token}
                  onChange={(e, value) => setToken(value)}
                  variant="solid"
                  className="select-token"
                  indicator={<KeyboardArrowDown />}
                  color="neutral"
                  slotProps={{
                    listbox: {
                      sx: {
                        "--ListItemDecorator-size": "35px",
                      },
                    },
                  }}
                  sx={{
                    "--ListItemDecorator-size": "35px",
                    background: "transparent",
                    minWidth: 120,
                  }}
                  renderValue={(option: any) => {
                    if (!tokens) return null;
                    const image =
                      tokens.find((o: any) => o.address === option.value)
                        ?.logo ?? ("" as any);
                    return (
                      <React.Fragment>
                        <ListItemDecorator>
                          <img
                            src={image}
                            alt="picture"
                            width={26}
                            height={26}
                            loading="lazy"
                          />
                        </ListItemDecorator>
                        {option.label}
                      </React.Fragment>
                    );
                  }}
                >
                  {tokens && tokens.length
                    ? tokens.map((token: any) => (
                        <React.Fragment key={token.address}>
                          <Option
                            value={token.address}
                            label={token.symbol}
                            sx={{
                              "&.Mui-selected": { backgroundColor: "#40504D" },
                              height: "48px",
                            }}
                          >
                            <ListItemDecorator>
                              <img
                                loading="lazy"
                                src={token.logo as any}
                                alt="picture"
                                width={26}
                                height={26}
                              />
                            </ListItemDecorator>
                            <span>{token.symbol}</span>
                          </Option>
                        </React.Fragment>
                      ))
                    : null}
                </Select>
              </div>
            </div>
            <div className="group-content">
              <p className="balance">
                {t("deposit_form_available_balance")}:{" "}
                {formatNumber(balanceFormated, 4)}
              </p>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <span
                  className="max"
                  onClick={() =>
                    setAmount(
                      (+parseFloat(balanceFormated).toFixed(4)).toString()
                    )
                  }
                >
                  MAX
                </span>
              </div>
            </div>
          </div>
          {renderButton()}
        </div>
      </div>
      <ModalConnectWebApp
        isOpen={openModalConnect}
        onCloseModal={() => setModalOpenConnect(false)}
      /> */}
    </div>
  );
}