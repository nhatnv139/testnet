"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../styles/FaucetTestnet.module.css";
import eth from "../../../public/images/icon_eth.svg";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import TableHistory from "./TableHistory";

export default function Information() {
  const { t } = useTranslation("common");
  const [token, setToken] = useState<any>("ETH");
  const tokens = [{ value: "ETH", label: "ETH", logo: eth }];
  //   const dataInformation = [
  //     {
  //       id: 1,
  //       name: t("inforName1"),
  //       subName: t("inforSubName1"),
  //       icon: icon1,
  //       action: action1,
  //       link: " https://parthenon.athenescan.io/",
  //     },
  //     {
  //       id: 2,
  //       name: t("inforName2"),
  //       subName: t("inforSubName2"),
  //       icon: icon2,
  //       action: action1,
  //       link: " https://parthenon.athenescan.io/",
  //     },
  //     {
  //       id: 3,
  //       name: t("inforName3"),
  //       subName: t("inforSubName3"),
  //       icon: icon3,
  //       action: action2,
  //       link: "",
  //     },
  //     {
  //       id: 4,
  //       name: t("inforName4"),
  //       subName: t("inforSubName4"),
  //       icon: icon3,
  //       action: action2,
  //       link: "",
  //     },
  //   ];
  const goToDocument = () => {
    console.log(13123);

    window.open("https://docs.caldera.xyz/tools/faucet", "_blank");
  };
  return (
    <div className={styles.faucetMain}>
      <div className={styles.faucetTitle}>{t("text_faucet")}</div>
      <div>
        <span className={styles.faucetSubTitle}>
          {t("text_sub_faucet")}{" "}
          <span
            className={styles.faucetSubTitle1}
            onClick={() => {
              goToDocument();
            }}
          >
            {t("text_document")}
          </span>
        </span>{" "}
        <div className={styles.faucetSubTitle}>{t("text_sub_faucet1")}</div>
      </div>

      <div className={styles.faucetSearch}>
        <Select
          value={"ETH"}
          onChange={(e, value) => setToken(value)}
          variant="solid"
          className={styles.selectEth}
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
            minWidth: 150,
          }}
          renderValue={(option: any) => {
            const image =
              tokens.find((o: any) => o.value === option.value)?.logo ??
              ("" as any);
            return (
              <React.Fragment>
                <ListItemDecorator>
                  <Image
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
          {tokens.map((token: any) => (
            <React.Fragment key={token.value}>
              <Option
                value={token.value}
                label={token.label}
                sx={{
                  "&.Mui-selected": { backgroundColor: "#40504D" },
                  height: "48px",
                }}
              >
                <ListItemDecorator>
                  <Image
                    loading="lazy"
                    src={token.logo as any}
                    alt="picture"
                    width={26}
                    height={26}
                  />
                </ListItemDecorator>
                <span>{token.label}</span>
              </Option>
            </React.Fragment>
          ))}
        </Select>
        <input
          className={styles.faucetSearchInput}
          type="text"
          placeholder="0x4cd77f2e986eEe137e1f1e2e2F80Ff17d86f2534"
        />
        <button className={styles.faucetRequest}>{t("text_request")}</button>
      </div>
      <div>
        <TableHistory />
      </div>
    </div>
  );
}
